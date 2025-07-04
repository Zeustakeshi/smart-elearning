import type { CourseCardProps } from "@/types/course.data";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Badge } from "./badge";
import { Card, CardContent, CardFooter, CardHeader } from "./card";
import { Crown, PlayCircle, Clock, Star } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export const CardCourse = ({
  imageUrl,
  title,
  authorName,
  authorImageUrl,
  views,
  duration,
  currentPrice,
  originalPrice,
  badgeType,
  isFree = false,
}: CourseCardProps) => {
  const renderBadge = () => {
    if (!badgeType) return null;

    const badges = {
      pro: {
        icon: <Crown className="w-4 h-4 mr-1" />,
        text: "Pro",
        className: "bg-yellow-400 text-black hover:bg-yellow-500",
      },
      bestseller: {
        icon: <Star className="w-4 h-4 mr-1" />,
        text: "Bestseller",
        className: "bg-orange-500 text-white hover:bg-orange-600",
      },
    };

    const badge = badges[badgeType];

    return (
      <div className="absolute top-2 left-2">
        <Badge className={badge.className}>
          {badge.icon}
          {badge.text}
        </Badge>
      </div>
    );
  };

  return (
    <Card className="w-80 rounded-xl border overflow-hidden flex flex-col hover:shadow-lg transition-shadow duration-300">
      {/* Phần hình ảnh */}
      <CardHeader className="p-0 relative">
        <img src={imageUrl} alt={title} className="w-full h-40 object-cover" />
        {renderBadge()}
      </CardHeader>

      {/* Phần nội dung */}
      <CardContent className="p-4 flex-grow">
        <h3 className="text-lg font-bold">{title}</h3>
        <div className="flex items-center gap-2 mt-2">
          {isFree ? (
            <p className="text-lg font-bold text-green-600">Miễn phí</p>
          ) : (
            <>
              {currentPrice && (
                <p className="text-lg font-bold text-red-500">
                  {formatCurrency(currentPrice)}
                </p>
              )}
              {originalPrice && (
                <p className="text-sm text-gray-500 line-through">
                  {formatCurrency(originalPrice)}
                </p>
              )}
            </>
          )}
        </div>
      </CardContent>

      {/* Phần chân trang */}
      <CardFooter className="p-4 pt-0 flex justify-between items-center text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <Avatar className="w-6 h-6">
            <AvatarImage src={authorImageUrl} alt={authorName} />
            <AvatarFallback>{authorName.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <span>{authorName}</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <PlayCircle className="w-4 h-4" />
            <span>{views}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{duration}</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};
