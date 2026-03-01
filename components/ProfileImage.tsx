import { HalftoneCmyk } from "@paper-design/shaders-react";

export function ProfileImage() {
  return (
    <div className="w-50 -mt-10 aspect-900/990 overflow-hidden border border-black/8 bg-sunken rounded-lg">
      <HalftoneCmyk
        image="/profile-image.png"
        colorBack="#ffffff00"
        colorC="#7a83ff"
        colorM="#d888ab"
        colorY="#b0b0b0"
        colorK="#060506"
        size={0.5}
        gridNoise={0.0}
        type="sharp"
        softness={1.0}
        contrast={0.75}
        gainC={-1.0}
        gainM={-0.27}
        gainY={0.2}
        gainK={0.0}
        floodC={0.11}
        floodM={0.0}
        floodY={0.0}
        floodK={0.0}
        grainMixer={0.0}
        grainSize={0.9}
        grainOverlay={0.0}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
