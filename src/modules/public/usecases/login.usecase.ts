import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { hashText } from 'pii-cyclops';
import { Repository } from 'typeorm';

import Constant from 'src/common/constant';
import { ADMIN } from 'src/common/constant/constant';
import MessageHandler from 'src/common/message';
import { User } from 'src/entities/user.entity';

import { LoginDto } from '../dto/login.dto';

@Injectable()
export class LoginUseCase {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async doLoginAdmin(req: any, body: LoginDto): Promise<any> {
        return this.performLogin(req, body, true);
    }

    async doLogin(req: any, body: LoginDto): Promise<any> {
        return this.performLogin(req, body, false);
    }

    private async performLogin(req: any, body: LoginDto, isAdmin: boolean): Promise<any> {
        const { password } = body;
        const trimmedUsername = body.username?.trim();
        const email_hash = hashText(trimmedUsername);
        
        const where: any = { email_hash };
        if (isAdmin) {
            where.role = ADMIN;
        }

        const selectOptions: any = {
            id: true,
            phone: true,
            name: true,
            role: true,
            password: true,
            avatar: true,
            fingerprint: true,
        };

        let user = await this.userRepository.findOne({
            where,
            select: selectOptions
        });

        // Fallback: Jika tidak ditemukan, coba dengan format huruf kecil (untuk backward compatibility)
        if (!user && trimmedUsername) {
            const lowerUsername = trimmedUsername.toLowerCase();
            if (lowerUsername !== trimmedUsername) {
                const lowerEmailHash = hashText(lowerUsername);
                where.email_hash = lowerEmailHash;
                user = await this.userRepository.findOne({
                    where,
                    select: selectOptions
                });
                
                if (user) {
                    console.log(`[LOGIN] Fallback normalization triggered for: ${lowerUsername}`);
                }
            }
        }

        if (!user) {
            throw new Error(MessageHandler.ERR001);
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error(MessageHandler.ERR001);
        }

        const tokenPayload: any = { id: user.id, name: user.name, role: user.role };
        
        if (isAdmin) {
            tokenPayload.phone = user.phone;
        } else {
            tokenPayload.email = trimmedUsername; // username is the email
            tokenPayload.avatar = user.avatar;
            
            const fingerprintHash = req?.fingerprint?.hash;
            if (fingerprintHash) {
                await this.userRepository.update(user.id, { fingerprint: fingerprintHash });
            }
        }

        const token = jwt.sign(tokenPayload, Constant.JWT_SECRET, { expiresIn: '7d' });
        
        const responseUser: any = { id: user.id, name: user.name };
        if (isAdmin) {
            responseUser.phone = user.phone;
        } else {
            responseUser.avatar = user.avatar;
        }

        return { 
            fingerprint: !isAdmin && Boolean(req?.fingerprint?.hash), 
            user: responseUser, 
            token 
        };
    }
}
