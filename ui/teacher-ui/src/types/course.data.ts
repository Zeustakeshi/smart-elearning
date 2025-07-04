export interface CourseCardProps {
  imageUrl: string;
  title: string;
  authorName: string;
  authorImageUrl: string;
  views: number;
  duration: string;
  currentPrice?: number;
  originalPrice?: number;
  badgeType?: "pro" | "bestseller";
  isFree?: boolean;
}
