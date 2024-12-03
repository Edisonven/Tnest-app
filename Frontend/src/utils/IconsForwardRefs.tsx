import { FaCircleUser } from "react-icons/fa6";
import { forwardRef } from "react";
import { BsGearFill } from "react-icons/bs";
import { IconForwardRef } from "../types/DomRefElement";
import { ThreeDotsIconForwardRef } from "../types/DomRefElement";
import { BsThreeDotsVertical } from "react-icons/bs";

export const GearIcon = forwardRef<HTMLDivElement, IconForwardRef>(
  (props, ref) => (
    <div ref={ref}>
      <BsGearFill {...props} />
    </div>
  )
);

export const UserIcon = forwardRef<HTMLDivElement, IconForwardRef>(
  (props, ref) => (
    <div ref={ref}>
      <FaCircleUser {...props} />
    </div>
  )
);

export const ThreeDotsIcon = forwardRef<
  HTMLDivElement,
  ThreeDotsIconForwardRef
>((props, ref) => (
  <div ref={ref}>
    <BsThreeDotsVertical {...props} />
  </div>
));
