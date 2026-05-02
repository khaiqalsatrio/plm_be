import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AppRequest, getIpAddress } from 'src/libraries/common/http.interface';

import { AuditLogService } from '../../modules/audit-logs/audit-log.service';
import { AuditActionType } from '../constant/enum';

@Injectable()
export class AuditLogInterceptor implements NestInterceptor {
  constructor(private readonly auditLogService: AuditLogService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<AppRequest>();
    const method = (request.method as string) || '';
    const { url, body, headers } = request;
    const userAgent = headers['user-agent'] as string;
    const user = request.logged;

    return next.handle().pipe(
      tap((responseBody) => {
        const action = this.mapMethodToAction(method);
        if (action) {
          this.auditLogService.log({
            user_id: user?.id,
            user_name: user?.name,
            action: action,
            entity_name: this.extractEntityName(url),
            entity_id: this.extractEntityId(url, responseBody),
            new_values: body,
            ip_address: getIpAddress(request),
            user_agent: userAgent,
          });
        }
      }),
    );
  }

  private mapMethodToAction(method: string): AuditActionType | null {
    switch (method) {
      case 'POST': return AuditActionType.CREATE;
      case 'PUT':
      case 'PATCH': return AuditActionType.UPDATE;
      case 'DELETE': return AuditActionType.DELETE;
      default: return null;
    }
  }

  private extractEntityName(url: string): string {
    const parts = url.split('?')[0].split('/');
    // Assuming /api/v1/entity-name or /entity-name
    return parts[2] || parts[1] || 'unknown';
  }

  private extractEntityId(url: string, responseBody: any): string {
    const parts = url.split('?')[0].split('/');
    // Check if the last part is a UUID
    const lastPart = parts[parts.length - 1];
    if (lastPart && lastPart.length > 20) {
        return lastPart;
    }
    
    // Fallback to response body
    return responseBody?.id || responseBody?.data?.id || null;
  }
}
