import { Button } from "@/components/ui/button";
import { CardCourse } from "@/components/ui/card_course";

export const InterfaceCourse = () => {
  return (
    <div>
      <div>
        <div className="flex justify-end mb-4">
          <Button>Thêm Lớp Học</Button>
        </div>

      </div>
      <CardCourse
        title="HTML CSS Pro"
        imageUrl="https://i.pinimg.com/736x/10/d8/d6/10d8d6aae9f16f1afda808c9982e2ac3.jpg"
        authorName="Huỳnh Ngọc Lên"
        authorImageUrl="https://i.pravatar.cc/40?u=son"
        views={590}
        duration="116h50p"
        currentPrice={1299000}
        originalPrice={2500000}
        badgeType="pro"
      />
    </div>
  );
};
