/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: { input: any; output: any; }
  /** A field containing either a integer or a string value */
  IntOrString: { input: any; output: any; }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any; }
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: { input: any; output: any; }
  /** Point scalar type */
  Point: { input: any; output: any; }
  /** Query data sort options scalar type */
  QuerySortOptions: { input: any; output: any; }
};

/** Account delete request types for account deletion requests */
export enum AccountDeleteRequestType {
  CancelRequest = 'CANCEL_REQUEST',
  RequestDelete = 'REQUEST_DELETE'
}

export type AccountInput = {
  addressLineOne?: InputMaybe<Scalars['String']['input']>;
  addressLineTwo?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  postcode?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  taxCountry?: InputMaybe<Scalars['String']['input']>;
  taxId?: InputMaybe<Scalars['String']['input']>;
};

export type AccountTaxInput = {
  taxCountry: Scalars['String']['input'];
  taxId: Scalars['String']['input'];
};

export type AnimationFilter = {
  canvaCompatible?: InputMaybe<Scalars['Boolean']['input']>;
  creatorCompatible?: InputMaybe<Scalars['Boolean']['input']>;
  hash?: InputMaybe<Scalars['String']['input']>;
};

export type AnimationReportInput = {
  animationId: Scalars['Int']['input'];
  body?: InputMaybe<Scalars['String']['input']>;
  complaintType: ComplaintType;
  url?: InputMaybe<Scalars['String']['input']>;
};

export type ApplyDiscountInput = {
  workspaceId: Scalars['ID']['input'];
};

/** Collection animation types */
export enum CollectionAnimationType {
  All = 'ALL',
  Animation = 'ANIMATION',
  Sticker = 'STICKER'
}

export type CollectionAnimationTypeInput = {
  animationType?: InputMaybe<CollectionAnimationType>;
};

export type CollectionInput = {
  title: Scalars['String']['input'];
  type?: InputMaybe<CollectionType>;
};

/** Collection types */
export enum CollectionType {
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}

export type CommentAnnotationInput = {
  ratio?: InputMaybe<Array<Scalars['Float']['input']>>;
  type: CommentAnnotationType;
  x: Scalars['Float']['input'];
  y: Scalars['Float']['input'];
};

/** The annotation type */
export enum CommentAnnotationType {
  Point = 'Point'
}

export type CommentCreateInput = {
  body: Scalars['String']['input'];
  entityId: Scalars['ID']['input'];
  extra?: InputMaybe<CommentExtraInput>;
  /** The name to use if the user is not authenticated. Ignored if user is authenticated. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** The entity type */
  type: CommentableEntityType;
};

export type CommentExtraInput = {
  annotation?: InputMaybe<CommentAnnotationInput>;
  frame: Scalars['Int']['input'];
  type: CommentExtraType;
};

/** Comment extra type */
export enum CommentExtraType {
  Annotation = 'Annotation',
  Keyframe = 'Keyframe'
}

export type CommentInput = {
  content: Scalars['String']['input'];
  frame: Scalars['Int']['input'];
  marker?: InputMaybe<Scalars['String']['input']>;
};

/** The type of mention */
export enum CommentMentionType {
  UserMention = 'UserMention'
}

export enum CommentableEntityType {
  FileVersion = 'FileVersion'
}

/** Complaint types for report animation */
export enum ComplaintType {
  GuidelinesViolation = 'GUIDELINES_VIOLATION',
  Other = 'OTHER',
  Plagiarism = 'PLAGIARISM'
}

/** Contract types for hire requests */
export enum ContractType {
  Freelance = 'FREELANCE',
  Fulltime = 'FULLTIME'
}

export type CreateEditorFileEditCounterInput = {
  fileId?: InputMaybe<Scalars['String']['input']>;
  key: Scalars['String']['input'];
};

export type CreateEnterpriseOrganizationInput = {
  domains: Array<Scalars['String']['input']>;
  organizationName: Scalars['String']['input'];
  workspaceId: Scalars['String']['input'];
};

export type CreateFolderInput = {
  folderId?: InputMaybe<Scalars['String']['input']>;
  isFolder?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  projectId: Scalars['String']['input'];
  slug: Scalars['String']['input'];
};

export type CreateUploadRequestInput = {
  bgColor?: InputMaybe<Scalars['String']['input']>;
  key?: InputMaybe<Scalars['String']['input']>;
  metadata?: InputMaybe<Scalars['Boolean']['input']>;
  previews?: InputMaybe<Scalars['Boolean']['input']>;
  thumbnails?: InputMaybe<Scalars['Boolean']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  variationType?: InputMaybe<Scalars['String']['input']>;
  versionId?: InputMaybe<Scalars['String']['input']>;
};

export type CreateWorkspaceColorPaletteInput = {
  colors: Array<Scalars['String']['input']>;
  workspaceId: Scalars['ID']['input'];
};

/** Duration filter types for popular animations */
export enum DurationFilterType {
  AllTime = 'ALL_TIME',
  Monthly = 'MONTHLY',
  Weekly = 'WEEKLY'
}

export type EnterpriseOrganizationDirectoryGroupInput = {
  groupMappings?: InputMaybe<Array<EnterpriseOrganizationGroupMapInput>>;
  workspaceId: Scalars['String']['input'];
};

export type EnterpriseOrganizationDomainsInput = {
  domains: Array<Scalars['String']['input']>;
  workspaceId: Scalars['String']['input'];
};

export type EnterpriseOrganizationGroupMapInput = {
  id: Scalars['String']['input'];
  internalName: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type FileCreateFallbackInput = {
  backgroundColor?: InputMaybe<Scalars['String']['input']>;
  fileKey: Scalars['String']['input'];
  folderId?: InputMaybe<Scalars['String']['input']>;
  handbackId?: InputMaybe<Scalars['String']['input']>;
  isFolder?: InputMaybe<Scalars['Boolean']['input']>;
  isHidden?: InputMaybe<Scalars['Boolean']['input']>;
  isMyPrivateAnimation?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  projectId: Scalars['String']['input'];
};

export type FileCreateInput = {
  backgroundColor?: InputMaybe<Scalars['String']['input']>;
  editorKey?: InputMaybe<Scalars['String']['input']>;
  fileKey: Scalars['String']['input'];
  fileVersionId: Scalars['String']['input'];
  folderId?: InputMaybe<Scalars['String']['input']>;
  handbackId?: InputMaybe<Scalars['String']['input']>;
  isFolder?: InputMaybe<Scalars['Boolean']['input']>;
  isHidden?: InputMaybe<Scalars['Boolean']['input']>;
  isMyPrivateAnimation?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  projectId: Scalars['ID']['input'];
};

export type FileDescriptionUpdateInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  showDescOnCollection: Scalars['Boolean']['input'];
};

export type FileDuplicateInput = {
  folderId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  projectId?: InputMaybe<Scalars['String']['input']>;
};

export enum FileOptimizationStatus {
  Failed = 'FAILED',
  Pending = 'PENDING',
  Processed = 'PROCESSED'
}

export type FileRenameInput = {
  name: Scalars['String']['input'];
};

/** Allowed status for files */
export enum FileStatus {
  Approved = 'Approved',
  InProgress = 'InProgress',
  NeedsReview = 'NeedsReview',
  NoStatus = 'NoStatus',
  Shipped = 'Shipped'
}

/** System classified file types */
export enum FileType {
  Animation = 'Animation',
  CreatorFile = 'CreatorFile',
  Folder = 'Folder'
}

export type FileVariantInput = {
  backgroundColor?: InputMaybe<Scalars['String']['input']>;
  format: Scalars['String']['input'];
  height: Scalars['Int']['input'];
  transparency?: InputMaybe<Scalars['Boolean']['input']>;
  width: Scalars['Int']['input'];
};

export type FileVariantUpdateInput = {
  fileSize: Scalars['Float']['input'];
  fileVariationId: Scalars['String']['input'];
};

export type FileVersionCreateFallbackInput = {
  backgroundColor?: InputMaybe<Scalars['String']['input']>;
  fileId: Scalars['ID']['input'];
  fileKey: Scalars['String']['input'];
  handbackId?: InputMaybe<Scalars['ID']['input']>;
  name: Scalars['String']['input'];
};

export type FileVersionCreateInput = {
  backgroundColor?: InputMaybe<Scalars['String']['input']>;
  fileId: Scalars['ID']['input'];
  fileKey: Scalars['String']['input'];
  fileSubVersionId?: InputMaybe<Scalars['String']['input']>;
  fileVersionId: Scalars['String']['input'];
  handbackId?: InputMaybe<Scalars['ID']['input']>;
  name: Scalars['String']['input'];
  type?: InputMaybe<Scalars['String']['input']>;
};

export type FolderRenameInput = {
  name: Scalars['String']['input'];
};

export type FrameInput = {
  height: Scalars['Float']['input'];
  width: Scalars['Float']['input'];
  x: Scalars['Float']['input'];
  y: Scalars['Float']['input'];
};

export type HireRequestInput = {
  brief: Scalars['String']['input'];
  contractType: ContractType;
  deadlineAt: Scalars['DateTime']['input'];
  shouldCopyEmail: Scalars['Boolean']['input'];
  subject: Scalars['String']['input'];
  userId: Scalars['ID']['input'];
};

export type HitCountEventInput = {
  ip?: InputMaybe<Scalars['String']['input']>;
  method: Scalars['Int']['input'];
  source?: InputMaybe<Scalars['Int']['input']>;
  userId?: InputMaybe<Scalars['ID']['input']>;
  visitorId?: InputMaybe<Scalars['ID']['input']>;
};

export type InitialAnimationUploadInput = {
  file: Scalars['String']['input'];
  projectId?: InputMaybe<Scalars['String']['input']>;
  workspaceId: Scalars['String']['input'];
};

export type InvitationRecipient = {
  access?: InputMaybe<Scalars['String']['input']>;
  recipientEmail: Scalars['String']['input'];
};

export type LottieJsonOptimizeInput = {
  /** The lottie json payload to optimize */
  fileUrl: Scalars['String']['input'];
  /** If true, will return a dotlottie file instead of a json file */
  returnDotLottie?: InputMaybe<Scalars['Boolean']['input']>;
};

export type LottieMockupAnimationConfigInput = {
  file?: InputMaybe<Scalars['String']['input']>;
  fileId?: InputMaybe<Scalars['String']['input']>;
  fileKey?: InputMaybe<Scalars['String']['input']>;
  loop: Scalars['Boolean']['input'];
  speed: Scalars['Float']['input'];
};

export type LottieMockupAnimationInput = {
  config: LottieMockupAnimationConfigInput;
  frame: FrameInput;
  rotation: Scalars['Float']['input'];
};

export enum LottieMockupAssetType {
  Animation = 'animation',
  Image = 'image',
  Text = 'text'
}

export type LottieMockupCanvasInput = {
  background: Scalars['String']['input'];
  height: Scalars['Float']['input'];
  templateSize: TemplateSize;
  width: Scalars['Float']['input'];
};

export type LottieMockupCreateInput = {
  animation: LottieMockupAnimationInput;
  animationId: Scalars['String']['input'];
  assets: Array<Scalars['JSON']['input']>;
  canvas: LottieMockupCanvasInput;
  description: Scalars['String']['input'];
  id: Scalars['String']['input'];
  name: Scalars['String']['input'];
  playSegmentId: Scalars['String']['input'];
  version: Scalars['String']['input'];
};

export enum NotificationChannelType {
  Chat = 'Chat',
  Email = 'Email',
  InApp = 'InApp',
  Push = 'Push',
  Sms = 'Sms'
}

export type NotificationPreferenceUpdateInput = {
  /** The channel to be enabled */
  channel: NotificationChannelType;
  /** To enable notification preference */
  enabled: Scalars['Boolean']['input'];
  /** The ID of the notification template */
  templateId: Scalars['String']['input'];
};

export type OffboardingQuestionInput = {
  answer: Scalars['String']['input'];
  question: Scalars['String']['input'];
};

export type PaymentIntentAddSeatsForResourceInput = {
  recipients: Array<SharedResourceInvitationRecipient>;
  resourceId: Scalars['ID']['input'];
  resourceType: PrivateShareType;
  workspaceAccess: Scalars['String']['input'];
  workspaceId: Scalars['ID']['input'];
};

export type PaymentIntentAddSeatsInput = {
  recipients: Array<InvitationRecipient>;
  workspaceId: Scalars['ID']['input'];
};

export type PaymentIntentInput = {
  onBoardAllMembers?: InputMaybe<Scalars['Boolean']['input']>;
  paymentMethod: Scalars['String']['input'];
  quantity?: InputMaybe<Scalars['Float']['input']>;
  ratePlanId: Scalars['ID']['input'];
  type: Scalars['String']['input'];
  workspaceId: Scalars['ID']['input'];
  workspaceMemberIds?: InputMaybe<Array<Scalars['String']['input']>>;
};

/** Payment service provider */
export enum PaymentProvider {
  Stripe = 'Stripe'
}

export enum PlaySegmentAction {
  Loop = 'Loop',
  PlayOnce = 'PlayOnce'
}

export type PlaySegmentInput = {
  action: PlaySegmentAction;
  endFrame: Scalars['Float']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  startFrame: Scalars['Float']['input'];
};

export type PortfolioPostInput = {
  content?: InputMaybe<Scalars['JSON']['input']>;
  contributors?: InputMaybe<Array<Scalars['String']['input']>>;
  coverImage?: InputMaybe<Scalars['String']['input']>;
  excerpt?: InputMaybe<Scalars['String']['input']>;
  isPublished?: InputMaybe<Scalars['Boolean']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  title: Scalars['String']['input'];
  workspaceId: Scalars['ID']['input'];
};

/** Portfolio post status */
export enum PortfolioPostStatus {
  Draft = 'Draft',
  Published = 'Published'
}

export type PortfolioPostUpdateInput = {
  content?: InputMaybe<Scalars['JSON']['input']>;
  contributors?: InputMaybe<Array<Scalars['String']['input']>>;
  coverImage?: InputMaybe<Scalars['String']['input']>;
  excerpt?: InputMaybe<Scalars['String']['input']>;
  isPublished?: InputMaybe<Scalars['Boolean']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  title: Scalars['String']['input'];
};

export type PortfolioSlugAvailableInput = {
  portfolioId: Scalars['ID']['input'];
  portfolioPostId?: InputMaybe<Scalars['ID']['input']>;
  slug: Scalars['String']['input'];
};

export type PortfolioUrlAvailableInput = {
  url: Scalars['String']['input'];
  workspaceId?: InputMaybe<Scalars['ID']['input']>;
};

export enum PreviewGenerationStatus {
  Failed = 'FAILED',
  Pending = 'PENDING',
  Processed = 'PROCESSED'
}

export enum PrivateShareType {
  Collection = 'COLLECTION',
  File = 'FILE',
  Project = 'PROJECT'
}

export type ProjectCreateInput = {
  isOpen?: InputMaybe<Scalars['Boolean']['input']>;
  isPrivate?: InputMaybe<Scalars['Boolean']['input']>;
  shareToken?: InputMaybe<Scalars['String']['input']>;
  slug: Scalars['String']['input'];
  title: Scalars['String']['input'];
  workspaceId: Scalars['String']['input'];
};

export type ProjectUpdateInput = {
  slug: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type PublicAnimationCreateInput = {
  bgColor?: InputMaybe<Scalars['String']['input']>;
  credits?: InputMaybe<Array<Scalars['String']['input']>>;
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  requestId: Scalars['String']['input'];
  scale?: InputMaybe<Scalars['Float']['input']>;
  tags: Array<Scalars['String']['input']>;
  tools?: InputMaybe<Array<Scalars['String']['input']>>;
  workflowFileId?: InputMaybe<Scalars['String']['input']>;
};

/** Public animation status filter types */
export enum PublicAnimationStatusFilterType {
  All = 'ALL',
  Pending = 'PENDING',
  Published = 'PUBLISHED',
  Rejected = 'REJECTED'
}

export type PublicAnimationStatusFilterTypeInput = {
  statusFilterType?: InputMaybe<PublicAnimationStatusFilterType>;
};

export type PublicAnimationUploadRequestCreateInput = {
  filename: Scalars['String']['input'];
  type: PublicAnimationUploadRequestFileType;
};

export enum PublicAnimationUploadRequestFileType {
  DotLottie = 'DOT_LOTTIE',
  Lottie = 'LOTTIE'
}

export type PublicAssetRestoreInput = {
  fileVersionId: Scalars['ID']['input'];
};

export type PublicAssetUpdateInput = {
  fileId: Scalars['ID']['input'];
  isActive: Scalars['Boolean']['input'];
};

export type PublicShareCreateInput = {
  allowGuestView?: InputMaybe<Scalars['Boolean']['input']>;
};

export enum PublicShareType {
  Collection = 'COLLECTION',
  File = 'FILE'
}

export type RasterToLottieJobParams = {
  /** Default value: 16. */
  antiAliasKernel?: InputMaybe<Scalars['Int']['input']>;
  /** Default value: 150. */
  cannyHighThreshold?: InputMaybe<Scalars['Int']['input']>;
  /** Default value: 50. */
  cannyLowThreshold?: InputMaybe<Scalars['Int']['input']>;
  /** Default value: false. */
  convertToShape?: InputMaybe<Scalars['Boolean']['input']>;
  /** Default value: false. */
  debug?: InputMaybe<Scalars['Boolean']['input']>;
  /** Default value: 60. */
  edgePercentage?: InputMaybe<Scalars['Int']['input']>;
  /** Default value: 15. */
  mergingDistanceThreshold?: InputMaybe<Scalars['Int']['input']>;
  /** Default value: 1.2. */
  potraceAlphamax?: InputMaybe<Scalars['Float']['input']>;
  /** Default value: true. */
  potraceOpticurve?: InputMaybe<Scalars['Boolean']['input']>;
  /** Default value: 0.2. */
  potraceOpttolerance?: InputMaybe<Scalars['Float']['input']>;
  /** Default value: 5. */
  potraceTurdsize?: InputMaybe<Scalars['Int']['input']>;
  /** Default value: 4. */
  potraceTurnPolicy?: InputMaybe<Scalars['Int']['input']>;
  /** Default value: false. */
  removeBackground?: InputMaybe<Scalars['Boolean']['input']>;
  /** Default value: false. */
  removeHoles?: InputMaybe<Scalars['Boolean']['input']>;
  /** Default value: false. */
  simplify?: InputMaybe<Scalars['Boolean']['input']>;
  /** Default value: 20. */
  threshold?: InputMaybe<Scalars['Int']['input']>;
  /** Default value: 100. */
  thresholdLarge?: InputMaybe<Scalars['Int']['input']>;
  /** Default value: false. */
  upscale?: InputMaybe<Scalars['Boolean']['input']>;
  /** Default value: 1. */
  upscaleFactor?: InputMaybe<Scalars['Int']['input']>;
};

export enum RasterToLottieJobStatus {
  Active = 'active',
  Completed = 'completed',
  Delayed = 'delayed',
  Failed = 'failed',
  Prioritized = 'prioritized',
  Unknown = 'unknown',
  Waiting = 'waiting'
}

export type RecentlyDeletedPurgeInput = {
  resourceId: Scalars['ID']['input'];
  resourceType: RecentlyDeletedResourceType;
};

export type RecentlyDeletedPurgeMultipleInput = {
  resourceIds: Scalars['ID']['input'];
  resourceType: RecentlyDeletedResourceType;
};

export type RecentlyDeletedResourceInput = {
  resourceId: Scalars['ID']['input'];
  resourceType: RecentlyDeletedResourceType;
};

export enum RecentlyDeletedResourceType {
  Collection = 'Collection',
  File = 'File',
  Folder = 'Folder',
  Project = 'Project'
}

export type RecentlyDeletedRestoreInput = {
  location?: InputMaybe<Scalars['ID']['input']>;
  resourceId: Scalars['ID']['input'];
  resourceType: RecentlyDeletedResourceType;
};

export enum RecentlyDeletedStatus {
  Idle = 'Idle',
  Purging = 'Purging',
  Restoring = 'Restoring'
}

export type SharedResourceInput = {
  inviteToWorkspace?: InputMaybe<Scalars['Boolean']['input']>;
  recipients: Array<SharedResourceInvitationRecipient>;
  resourceId: Scalars['ID']['input'];
  resourceType: PrivateShareType;
  workspaceAccess?: InputMaybe<Scalars['String']['input']>;
  workspaceId?: InputMaybe<Scalars['ID']['input']>;
};

export type SharedResourceInvitationRecipient = {
  access: Scalars['String']['input'];
  existingMember?: InputMaybe<Scalars['Boolean']['input']>;
  recipientEmail?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type SourceFileCreateInput = {
  fileId: Scalars['String']['input'];
  fileVersionId: Scalars['String']['input'];
  sourceFileKey?: InputMaybe<Scalars['String']['input']>;
  sourceFileName: Scalars['String']['input'];
  sourceFileSize?: InputMaybe<Scalars['Float']['input']>;
  sourceFileVersionId?: InputMaybe<Scalars['String']['input']>;
  sourceType: Scalars['String']['input'];
  sourceUrl?: InputMaybe<Scalars['String']['input']>;
};

export type SubscriptionCancelInput = {
  reasonId: Scalars['String']['input'];
  reasonText?: InputMaybe<Scalars['String']['input']>;
  subscriptionId: Scalars['String']['input'];
  workspaceId: Scalars['String']['input'];
};

export enum TemplateSize {
  Desktop = 'desktop',
  Mobile = 'mobile',
  Tablet = 'tablet'
}

export type UpdateFileInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  folderId?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  projectId?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  sourceFileKey?: InputMaybe<Scalars['String']['input']>;
  sourceFileType?: InputMaybe<Scalars['String']['input']>;
  sourceFilename?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateOnboardingChecklistInput = {
  completeSeen?: InputMaybe<Scalars['Boolean']['input']>;
  dismissSeen?: InputMaybe<Scalars['Boolean']['input']>;
  doneOnboardings?: InputMaybe<Array<Scalars['String']['input']>>;
  seen?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UpdateOnboardingInput = {
  animColorPaletteBtnHotspot?: InputMaybe<Scalars['Boolean']['input']>;
  animCommentBtnHotspot?: InputMaybe<Scalars['Boolean']['input']>;
  animDescriptionSequence?: InputMaybe<Scalars['Boolean']['input']>;
  animPanelBtnHotspot?: InputMaybe<Scalars['Boolean']['input']>;
  animSegmentBtnHotspot?: InputMaybe<Scalars['Boolean']['input']>;
  animTitleHotspot?: InputMaybe<Scalars['Boolean']['input']>;
  animTopbarHotspot?: InputMaybe<Scalars['Boolean']['input']>;
  animVersionBtnHotspot?: InputMaybe<Scalars['Boolean']['input']>;
  dashboardAnimUploadHotspot?: InputMaybe<Scalars['Boolean']['input']>;
  dashboardCollectionHotspot?: InputMaybe<Scalars['Boolean']['input']>;
  dashboardCollectionViewSequence?: InputMaybe<Scalars['Boolean']['input']>;
  dashboardCreateAnimationHotspot?: InputMaybe<Scalars['Boolean']['input']>;
  dashboardOptimizedDotlottieBanner?: InputMaybe<Scalars['Boolean']['input']>;
  dashboardPageHotspot?: InputMaybe<Scalars['Boolean']['input']>;
  dashboardPremiumAssetHotspot?: InputMaybe<Scalars['Boolean']['input']>;
  dashboardPublicProfileHotspot?: InputMaybe<Scalars['Boolean']['input']>;
  dashboardSlackIntegrationBellIndicator?: InputMaybe<Scalars['Boolean']['input']>;
  dashboardSlackIntegrationPopup?: InputMaybe<Scalars['Boolean']['input']>;
  dashboardWelcomeLfModal?: InputMaybe<Scalars['Boolean']['input']>;
  dashboardWelcomeTeamModal?: InputMaybe<Scalars['Boolean']['input']>;
  dashboardWelcomeUpgradedModal?: InputMaybe<Scalars['Boolean']['input']>;
  dashboardWorkspaceCollectionHotspot?: InputMaybe<Scalars['Boolean']['input']>;
  dashboardWorkspaceHotspot?: InputMaybe<Scalars['Boolean']['input']>;
  folderCreateAnimationHotspot?: InputMaybe<Scalars['Boolean']['input']>;
  introAnimSequence?: InputMaybe<Scalars['Boolean']['input']>;
  introDashboardSequence?: InputMaybe<Scalars['Boolean']['input']>;
  multiPlayerOnboarding?: InputMaybe<Scalars['Boolean']['input']>;
  projectCreateAnimationHotspot?: InputMaybe<Scalars['Boolean']['input']>;
  slackOnboardingForComment?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UpdateOnboardingV2Input = {
  completeSeen?: InputMaybe<Scalars['Boolean']['input']>;
  dismissSeen?: InputMaybe<Scalars['Boolean']['input']>;
  doneOnboardings?: InputMaybe<Array<Scalars['String']['input']>>;
  seen?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UpdateWorkspaceColorPaletteInput = {
  colors: Array<Scalars['String']['input']>;
};

export type WorkspaceCollectionCreateInput = {
  files: Scalars['JSON']['input'];
  isPrivate?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  slug: Scalars['String']['input'];
  workspaceId: Scalars['String']['input'];
};

export type WorkspaceCollectionUpdateInput = {
  files?: InputMaybe<Scalars['JSON']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  workspaceId?: InputMaybe<Scalars['String']['input']>;
};

/** The type of access granted to users who wish to join the workspace via discovery */
export enum WorkspaceDiscoveryJoinType {
  Instant = 'INSTANT',
  UponApproval = 'UPON_APPROVAL'
}

export type WorkspaceInput = {
  billingAddressLineOne?: InputMaybe<Scalars['String']['input']>;
  billingAddressLineTwo?: InputMaybe<Scalars['String']['input']>;
  billingEmail?: InputMaybe<Scalars['String']['input']>;
  icon?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
};

export type WorkspaceMemberInput = {
  email: Scalars['String']['input'];
  role: Scalars['String']['input'];
};

export type WorkspaceMemberSendInviteInput = {
  recipients: Array<InvitationRecipient>;
  resourceId?: InputMaybe<Scalars['String']['input']>;
  resourceType?: InputMaybe<Scalars['String']['input']>;
};

export type WorkspacePortfolioInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  isPrivate?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  url?: InputMaybe<Scalars['String']['input']>;
  workspaceId: Scalars['String']['input'];
};

export type WorkspaceSettingsUpdateInput = {
  allowAiFeatures?: InputMaybe<Scalars['Boolean']['input']>;
  allowExternalInvites?: InputMaybe<Scalars['Boolean']['input']>;
  allowExternalShares?: InputMaybe<Scalars['Boolean']['input']>;
  allowJoinRequest?: InputMaybe<Scalars['Boolean']['input']>;
  allowMemberInvites?: InputMaybe<Scalars['Boolean']['input']>;
  allowPremiumAnimations?: InputMaybe<Scalars['Boolean']['input']>;
  allowPublishToCommunity?: InputMaybe<Scalars['Boolean']['input']>;
  defaultRole?: InputMaybe<Scalars['String']['input']>;
  discoveryJoinType?: InputMaybe<WorkspaceDiscoveryJoinType>;
  isDiscoverable?: InputMaybe<Scalars['Boolean']['input']>;
  maxSessionDurationDays?: InputMaybe<Scalars['Float']['input']>;
};

export type WorkspaceSubscriptionCheckoutForEmbedInput = {
  onBoardAllMembers?: InputMaybe<Scalars['Boolean']['input']>;
  paymentProvider?: InputMaybe<Scalars['String']['input']>;
  pricingId: Scalars['String']['input'];
  quantity?: InputMaybe<Scalars['Float']['input']>;
  referralCode?: InputMaybe<Scalars['String']['input']>;
  returnTo?: InputMaybe<Scalars['String']['input']>;
  source?: InputMaybe<Scalars['String']['input']>;
  viewerQuantity?: InputMaybe<Scalars['Float']['input']>;
  workspaceId: Scalars['String']['input'];
  workspaceMemberIds?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type WorkspaceSubscriptionCheckoutSessionInput = {
  account?: InputMaybe<AccountInput>;
  brainTreeClientToken?: InputMaybe<Scalars['String']['input']>;
  ctaButtonText?: InputMaybe<Scalars['String']['input']>;
  isExtendedTrial?: InputMaybe<Scalars['Boolean']['input']>;
  isPrepayOptional?: InputMaybe<Scalars['Boolean']['input']>;
  isTrial?: InputMaybe<Scalars['Boolean']['input']>;
  onBoardAllMembers?: InputMaybe<Scalars['Boolean']['input']>;
  paymentProvider?: InputMaybe<Scalars['String']['input']>;
  pricingId: Scalars['String']['input'];
  quantity?: InputMaybe<Scalars['Float']['input']>;
  referralCode?: InputMaybe<Scalars['String']['input']>;
  returnTo?: InputMaybe<Scalars['String']['input']>;
  source?: InputMaybe<Scalars['String']['input']>;
  viewerQuantity?: InputMaybe<Scalars['Float']['input']>;
  workspaceId: Scalars['String']['input'];
  workspaceMemberIds?: InputMaybe<Array<Scalars['String']['input']>>;
  workspaceMembers?: InputMaybe<Array<WorkspaceMemberInput>>;
};

export type WorkspaceSubscriptionUpgradeInput = {
  pricingId?: InputMaybe<Scalars['String']['input']>;
  quantity?: InputMaybe<Scalars['Float']['input']>;
  workspaceId: Scalars['String']['input'];
};

export type ZipEntryInput = {
  id: Scalars['String']['input'];
  type?: InputMaybe<ZipEntryType>;
};

export enum ZipEntryType {
  File = 'FILE',
  Folder = 'FOLDER',
  Project = 'PROJECT'
}

export type ZipFileCreateInput = {
  entries: Array<ZipEntryInput>;
  type?: InputMaybe<ZipFileType>;
};

export enum ZipFileType {
  Dotlottie = 'DOTLOTTIE',
  Lottie = 'LOTTIE',
  OptimizedDotlottie = 'OPTIMIZED_DOTLOTTIE',
  OptimizedLottie = 'OPTIMIZED_LOTTIE'
}

export type _FileAssetUploadRequestCreateInput = {
  /** The ID of the FileSpace this asset belongs to. Required when type is `"update"`. */
  fileSpaceId?: InputMaybe<Scalars['String']['input']>;
  /** The path of the asset within the FileSpace. */
  pathname: Scalars['String']['input'];
  /** The type of the request: Either `"new"` or `"update"`. */
  type: Scalars['String']['input'];
};

export type _ZipEntryInput = {
  fileKey: Scalars['String']['input'];
  fileVersionId: Scalars['String']['input'];
  filename?: InputMaybe<Scalars['String']['input']>;
};

export type _ZipFileCreateInput = {
  entries: Array<_ZipEntryInput>;
  /** Type of variation to download */
  entryType?: InputMaybe<Scalars['String']['input']>;
};

export type FeaturedPublicAnimationsQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['QuerySortOptions']['input']>;
  filters?: InputMaybe<AnimationFilter>;
}>;


export type FeaturedPublicAnimationsQuery = { __typename?: 'Query', featuredPublicAnimations: { __typename?: 'PublicAnimationConnection', totalCount: number, edges: Array<{ __typename?: 'PublicAnimationEdge', cursor: string, node: { __typename?: 'PublicAnimation', bgColor?: string | null, url?: string | null, gifUrl?: string | null, description?: string | null, downloads?: number | null, lottieUrl?: string | null, name: string, likesCount: number, isLiked: boolean, createdBy?: { __typename?: 'User', avatarUrl: string, username: string, firstName: string, lastName?: string | null } | null } }>, pageInfo: { __typename?: 'PageInfo', endCursor?: string | null, hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null } } };


export const FeaturedPublicAnimationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FeaturedPublicAnimations"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"before"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"last"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"QuerySortOptions"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"AnimationFilter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"featuredPublicAnimations"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"Argument","name":{"kind":"Name","value":"before"},"value":{"kind":"Variable","name":{"kind":"Name","value":"before"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"last"},"value":{"kind":"Variable","name":{"kind":"Name","value":"last"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bgColor"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"gifUrl"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"downloads"}},{"kind":"Field","name":{"kind":"Name","value":"lottieUrl"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"likesCount"}},{"kind":"Field","name":{"kind":"Name","value":"isLiked"}},{"kind":"Field","name":{"kind":"Name","value":"createdBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}},{"kind":"Field","name":{"kind":"Name","value":"startCursor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}}]} as unknown as DocumentNode<FeaturedPublicAnimationsQuery, FeaturedPublicAnimationsQueryVariables>;