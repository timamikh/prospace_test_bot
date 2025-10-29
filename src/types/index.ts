/**
 * TypeScript типы и интерфейсы для TMS Driver Mini App
 * Last Updated: 29-10-2025
 */

// ==================== User Types ====================

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  ON_ROUTE = 'on_route',
  ON_BREAK = 'on_break',
  OFFLINE = 'offline'
}

export interface User {
  id: string;
  phone: string;
  name: string;
  status: UserStatus;
  registrationDate: Date;
  telegramId?: number;
  avatar?: string;
  email?: string;
}

// ==================== Route Types ====================

export enum TripStatus {
  ARRIVED = 'arrived',
  DEPARTED = 'departed',
  LOADING = 'loading',
  UNLOADING = 'unloading',
  IN_TRANSIT = 'in_transit',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

export interface Location {
  address: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  gateNumber?: string;
  contactPerson?: string;
  contactPhone?: string;
}

export interface Route {
  id: string;
  from: Location;
  to: Location;
  status: TripStatus;
  startTime: Date;
  endTime: Date;
  estimatedArrival?: Date;
  instructions?: string;
  distance?: number;
  cargoType?: string;
  cargoWeight?: number;
  documents?: Document[];
  checkpoints?: Checkpoint[];
}

export interface Checkpoint {
  id: string;
  location: Location;
  arrivalTime?: Date;
  departureTime?: Date;
  status: TripStatus;
  notes?: string;
}

// ==================== Incident Types ====================

export enum IncidentStatus {
  CREATED = 'created',
  IN_PROGRESS = 'in_progress',
  RESOLVED = 'resolved',
  CLOSED = 'closed',
  REJECTED = 'rejected'
}

export enum IncidentPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

export enum IncidentType {
  ACCIDENT = 'accident',
  BREAKDOWN = 'breakdown',
  DELAY = 'delay',
  DOCUMENTATION = 'documentation',
  SAFETY = 'safety',
  OTHER = 'other'
}

export interface Incident {
  id: string;
  description: string;
  type: IncidentType;
  priority: IncidentPriority;
  status: IncidentStatus;
  mediaFiles: MediaFile[];
  createdAt: Date;
  updatedAt?: Date;
  resolvedAt?: Date;
  routeId?: string;
  location?: Location;
  createdBy: string;
  assignedTo?: string;
  comments?: Comment[];
}

export interface Comment {
  id: string;
  text: string;
  authorId: string;
  authorName: string;
  createdAt: Date;
}

// ==================== Media Types ====================

export enum MediaType {
  IMAGE = 'image',
  VIDEO = 'video',
  DOCUMENT = 'document',
  AUDIO = 'audio'
}

export interface MediaFile {
  id: string;
  type: MediaType;
  url: string;
  thumbnailUrl?: string;
  fileName: string;
  size: number;
  uploadedAt: Date;
  mimeType?: string;
}

// ==================== Document Types ====================

export enum DocumentType {
  WAYBILL = 'waybill',
  ETRN = 'etrn',
  INVOICE = 'invoice',
  CMR = 'cmr',
  CUSTOMS = 'customs',
  OTHER = 'other'
}

export interface Document {
  id: string;
  type: DocumentType;
  name: string;
  url: string;
  fileSize: number;
  uploadedAt: Date;
  expiresAt?: Date;
  verified: boolean;
}

// ==================== Notification Types ====================

export enum NotificationType {
  GATE_CALL = 'gate_call',
  ROUTE_UPDATE = 'route_update',
  INCIDENT_UPDATE = 'incident_update',
  DOCUMENT_REQUEST = 'document_request',
  SYSTEM = 'system',
  WARNING = 'warning'
}

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  gateNumber?: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
  routeId?: string;
  incidentId?: string;
  priority: 'low' | 'medium' | 'high';
}

// ==================== API Response Types ====================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
  message?: string;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, any>;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

// ==================== Form Types ====================

export interface LoginFormData {
  phone: string;
}

export interface SMSVerificationFormData {
  code: string;
}

export interface IncidentFormData {
  description: string;
  type: IncidentType;
  priority: IncidentPriority;
  location?: Location;
  mediaFiles: File[];
}

export interface ProfileFormData {
  name: string;
  email?: string;
  phone: string;
  avatar?: File;
}

// ==================== Filter Types ====================

export interface IncidentFilter {
  status?: IncidentStatus[];
  type?: IncidentType[];
  priority?: IncidentPriority[];
  dateFrom?: Date;
  dateTo?: Date;
  routeId?: string;
}

export interface RouteFilter {
  status?: TripStatus[];
  dateFrom?: Date;
  dateTo?: Date;
}

// ==================== State Types ====================

export interface LoadingState {
  isLoading: boolean;
  loadingMessage?: string;
}

export interface ErrorState {
  hasError: boolean;
  errorMessage?: string;
  errorCode?: string;
}

// ==================== Storage Keys ====================

export enum StorageKeys {
  AUTH_TOKEN = 'tms_auth_token',
  USER_DATA = 'tms_user_data',
  ROUTES_CACHE = 'tms_routes_cache',
  INCIDENTS_CACHE = 'tms_incidents_cache',
  SETTINGS = 'tms_settings',
  OFFLINE_QUEUE = 'tms_offline_queue'
}

// ==================== Config Types ====================

export interface AppConfig {
  apiBaseUrl: string;
  apiTimeout: number;
  maxFileSize: number;
  allowedFileTypes: string[];
  cacheExpiration: number;
  retryAttempts: number;
}

export interface TelegramConfig {
  botToken: string;
  botUsername: string;
}

