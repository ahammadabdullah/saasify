import { Badge } from "@/components/presets/custom-badge";

export const BadgesSection = () => (
  <div className="space-y-8">
    <h2 className="text-2xl font-semibold">Badges</h2>

    <div className="space-y-4">
      <h3 className="text-lg font-medium">Default</h3>
      <div className="flex flex-wrap gap-4">
        <Badge variant="default">Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="destructive">Destructive</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="info">Info</Badge>
      </div>
    </div>

    <div className="space-y-4">
      <h3 className="text-lg font-medium">Pill</h3>
      <div className="flex flex-wrap gap-4">
        <Badge variant="default" shape="pill">
          Default
        </Badge>
        <Badge variant="secondary" shape="pill">
          Secondary
        </Badge>
        <Badge variant="destructive" shape="pill">
          Destructive
        </Badge>
        <Badge variant="outline" shape="pill">
          Outline
        </Badge>
        <Badge variant="success" shape="pill">
          Success
        </Badge>
        <Badge variant="warning" shape="pill">
          Warning
        </Badge>
        <Badge variant="info" shape="pill">
          Info
        </Badge>
      </div>
    </div>

    <div className="space-y-4">
      <h3 className="text-lg font-medium">Square</h3>
      <div className="flex flex-wrap gap-4">
        <Badge variant="default" shape="square">
          Default
        </Badge>
        <Badge variant="secondary" shape="square">
          Secondary
        </Badge>
        <Badge variant="destructive" shape="square">
          Destructive
        </Badge>
        <Badge variant="outline" shape="square">
          Outline
        </Badge>
      </div>
    </div>

    <div className="space-y-4">
      <h3 className="text-lg font-medium">Diamond</h3>
      <div className="flex flex-wrap gap-10 ml-10">
        <Badge variant="default" shape="diamond" className="h-8 w-8">
          <span className="-rotate-45">New</span>
        </Badge>
        <Badge variant="secondary" shape="diamond" className="h-8 w-8">
          <span className="-rotate-45">2</span>
        </Badge>
        <Badge variant="destructive" shape="diamond" className="h-8 w-8">
          <span className="-rotate-45">!</span>
        </Badge>
        <Badge variant="outline" shape="diamond" className="h-8 w-8">
          <span className="-rotate-45">i</span>
        </Badge>
      </div>
    </div>

    <div className="space-y-4">
      <h3 className="text-lg font-medium">Sizes</h3>
      <div className="flex flex-wrap gap-4 items-center">
        <Badge size="sm">Small</Badge>
        <Badge size="default">Default</Badge>
        <Badge size="lg">Large</Badge>
      </div>
    </div>
  </div>
);
