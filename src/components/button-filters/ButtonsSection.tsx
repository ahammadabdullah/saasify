import { CustomButton } from "@/components/presets/custom-button";
import { Mail, Trash2, Pencil, ArrowRight } from "lucide-react";

export const ButtonsSection = () => (
  <div className="space-y-4">
    <h2 className="text-2xl font-semibold">Buttons</h2>

    <div className="space-y-4">
      <h3 className="text-lg font-medium">Default</h3>
      <div className="flex flex-wrap gap-4">
        <CustomButton variant="ghost">Ghost</CustomButton>
        <CustomButton variant="outline">Outline</CustomButton>
        <CustomButton variant="default">Default</CustomButton>
        <CustomButton variant="secondary">Secondary</CustomButton>
        <CustomButton variant="destructive">Destructive</CustomButton>
      </div>
    </div>

    <div className="space-y-4">
      <h3 className="text-lg font-medium">Circle</h3>
      <div className="flex flex-wrap gap-4">
        <CustomButton variant="default" shape="circle" size="icon">
          <Mail className="h-4 w-4" />
        </CustomButton>
        <CustomButton variant="destructive" shape="circle" size="icon">
          <Trash2 className="h-4 w-4" />
        </CustomButton>
        <CustomButton variant="outline" shape="circle" size="icon">
          <Pencil className="h-4 w-4" />
        </CustomButton>
        <CustomButton variant="secondary" shape="circle" size="icon">
          <Mail className="h-4 w-4" />
        </CustomButton>
        <CustomButton variant="ghost" shape="circle" size="icon">
          <Mail className="h-4 w-4" />
        </CustomButton>
      </div>
    </div>

    <div className="space-y-4">
      <h3 className="text-lg font-medium">Square</h3>
      <div className="flex flex-wrap gap-4">
        <CustomButton variant="default" shape="square" size="icon">
          <Mail className="h-4 w-4" />
        </CustomButton>
        <CustomButton variant="destructive" shape="square" size="icon">
          <Trash2 className="h-4 w-4" />
        </CustomButton>
        <CustomButton variant="outline" shape="square" size="icon">
          <Pencil className="h-4 w-4" />
        </CustomButton>
        <CustomButton variant="secondary" shape="square" size="icon">
          <Mail className="h-4 w-4" />
        </CustomButton>
        <CustomButton variant="ghost" shape="square" size="icon">
          <Mail className="h-4 w-4" />
        </CustomButton>
      </div>
    </div>

    <div className="space-y-4">
      <h3 className="text-lg font-medium">Pill-Shaped</h3>
      <div className="flex flex-wrap gap-4">
        <CustomButton variant="default" shape="pill">
          <Mail className="h-4 w-4 mr-2" /> Email
        </CustomButton>
        <CustomButton variant="destructive" shape="pill">
          <Trash2 className="h-4 w-4 mr-2" /> Delete
        </CustomButton>
        <CustomButton variant="outline" shape="pill">
          <Pencil className="h-4 w-4 mr-2" /> Edit
        </CustomButton>
        <CustomButton variant="secondary" shape="pill">
          Email <Mail className="h-4 w-4 ml-2" />
        </CustomButton>
        <CustomButton variant="ghost" shape="pill">
          Delete <Trash2 className="h-4 w-4 ml-2" />
        </CustomButton>
      </div>
    </div>

    <div className="space-y-4">
      <h3 className="text-lg font-medium">Diamond</h3>
      <div className="flex flex-wrap gap-10 ml-10">
        <CustomButton
          variant="outline"
          shape="diamond"
          className="h-16 w-16"
          size="default"
        >
          <ArrowRight className="h-6 w-6 -rotate-45" />
        </CustomButton>
        <CustomButton
          variant="secondary"
          shape="diamond"
          className="h-20 w-20"
          size="icon"
        >
          <span className="-rotate-45 text-xs">Click Me</span>
        </CustomButton>
      </div>
    </div>
  </div>
);
