import { CardCourse } from "@/components/ui/card_course";
import { isAuthenticated } from "@/services/authServices";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: About,
});

function About() {
  // Logging login status before rendering
  if (isAuthenticated()) {
    console.log("Đã đăng nhập");
  } else {
    console.log("Chưa đăng nhập");
  }

  return (
    <div className="flex items-center justify-center gap-4 p-4">
      <CardCourse
        title="HTML CSS Pro"
        imageUrl="https://i.pinimg.com/736x/10/d8/d6/10d8d6aae9f16f1afda808c9982e2ac3.jpg"
        authorName="Sơn Đặng"
        authorImageUrl="https://i.pravatar.cc/40?u=son"
        views={590}
        duration="116h50p"
        currentPrice={1299000}
        originalPrice={2500000}
        badgeType="pro"
      />
      <CardCourse
        title="HTML CSS Pro"
        imageUrl="https://i.pinimg.com/736x/aa/53/92/aa53923fb89c69adcf1b5b933c8639c5.jpg"
        authorName="Ronaldo"
        authorImageUrl="https://i.pinimg.com/736x/49/b2/bd/49b2bda8a7aca2c170ffa12737230dc9.jpg"
        views={590}
        duration="116h50p"
        currentPrice={1299000}
        originalPrice={2500000}
        badgeType="pro"
      />
    </div>
  );
}
