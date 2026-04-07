export enum ProductType {
  DIGITAL_PRODUCT = 'digital_product',
  INTERNAL_TOOL = 'internal_tool',
  PARTNERSHIP_PRODUCT = 'partnership_product',
  AI_PRODUCT = 'ai_product',
  API_SERVICE = 'api_service',
}

export enum ProductStage {
  IDEA = 'idea',
  DISCOVERY = 'discovery',
  ASSESSMENT = 'assessment',
  DEVELOPMENT = 'development',
  PILOT = 'pilot',
  LAUNCH = 'launch',
  RETIRED = 'retired',
}

export enum ProductPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical',
}

export enum ProductStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  ARCHIVED = 'archived',
}

export enum AssessmentType {
  INITIAL = 'initial',
  REVISION = 'revision',
  REASSESSMENT = 'reassessment',
  PERIODIC_REVIEW = 'periodic_review',
}

export enum AssessmentStatus {
  DRAFT = 'draft',
  SUBMITTED = 'submitted',
  IN_REVIEW = 'in_review',
  NEED_REVISION = 'need_revision',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  ARCHIVED = 'archived',
}

export enum ReviewStatus {
  NOT_STARTED = 'not_started',
  IN_PROGRESS = 'in_progress',
  REVIEWED = 'reviewed',
  RETURNED = 'returned',
  FINALIZED = 'finalized',
}

export enum RiskLevel {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical',
}

export enum AssessmentRecommendation {
  RECOMMENDED = 'recommended',
  RECOMMENDED_WITH_REVISION = 'recommended_with_revision',
  MAJOR_REVISION_NEEDED = 'major_revision_needed',
  NOT_RECOMMENDED = 'not_recommended',
}

export enum SectionType {
  TECHNICAL = 'technical',
  BUSINESS = 'business',
  LEGAL = 'legal',
}

export enum ScoreType {
  MANUAL_SCORE = 'manual_score',
  AUTO_SCORE = 'auto_score',
  BOOLEAN_SCORE = 'boolean_score',
  OPTION_SCORE = 'option_score',
}

export enum QuestionType {
  STATEMENT = 'statement',
  QUESTION = 'question',
  CHECKLIST = 'checklist',
}

export enum AnswerType {
  TEXT = 'text',
  NUMBER = 'number',
  BOOLEAN = 'boolean',
  SELECT = 'select',
  MULTI_SELECT = 'multi_select',
  SCORE = 'score',
}

export enum ReviewerType {
  TECHNICAL = 'technical',
  BUSINESS = 'business',
  LEGAL = 'legal',
  OWNER = 'owner',
}

export enum ReviewRecommendation {
  PASS = 'pass',
  PASS_WITH_NOTES = 'pass_with_notes',
  REVISION_NEEDED = 'revision_needed',
  NOT_RECOMMENDED = 'not_recommended',
}

export enum ApprovalDecision {
  APPROVE = 'approve',
  APPROVE_WITH_CONDITION = 'approve_with_condition',
  NEED_REVISION = 'need_revision',
  REJECT = 'reject',
  HOLD = 'hold',
}

export enum DocumentType {
  BUSINESS_CASE = 'business_case',
  BRD = 'brd',
  ARCHITECTURE_DIAGRAM = 'architecture_diagram',
  LEGAL_OPINION = 'legal_opinion',
  COMPLIANCE_CHECKLIST = 'compliance_checklist',
  SIGNED_DOCUMENT = 'signed_document',
  OTHER = 'other',
}

export enum CommentType {
  GENERAL = 'general',
  REVIEW_NOTE = 'review_note',
  REVISION_NOTE = 'revision_note',
  APPROVAL_NOTE = 'approval_note',
}

export enum AuditActionType {
  CREATE = 'create',
  UPDATE = 'update',
  SUBMIT = 'submit',
  START_REVIEW = 'start_review',
  REVIEW = 'review',
  RETURN = 'return',
  APPROVE = 'approve',
  REJECT = 'reject',
  ARCHIVE = 'archive',
}
