import { MemoExoticComponent, PropsWithChildren, memo } from "react";
import Image from "next/image";
import { format } from "date-fns";
import Link from "next/link";

import type { CardInfo } from "@/types/notion";
import { cn } from "../utils";

type CardProps = Pick<CardInfo, "date" | "public_url" | "tech"> & {
  title: string;
  loading?: boolean;
} & PropsWithChildren;

type CardComponentType = MemoExoticComponent<typeof CustomCard> & {
  Skeleton: typeof Skeleton;
};

const defaultImage =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/wAALCAEsASwBAREA/8QAFQABAQAAAAAAAAAAAAAAAAAAAAj/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/9oACAEBAAA/ALLAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf//Z";

const Skeleton = () => (
  <div className="relative flex flex-col items-center w-full h-full overflow-hidden bg-white border border-gray-200 cursor-pointer group rounded-xl animate-pulse">
    <div className="relative flex flex-col items-center w-full h-full min-w-[10.125rem] min-h-[9.75rem] xs:min-h-[12.75rem]">
      <div className="w-full h-full bg-gray-200 rounded-lg" />
    </div>
    <div className="absolute top-0 left-0 flex justify-center items-center w-[2.75rem] h-[2.75rem] p-[0.625rem] bg-gray-200 rounded-br-2xl">
      <div className="w-6 h-6 bg-gray-200 rounded" />
    </div>
    <div className="flex flex-col w-full pt-2 pb-4 pl-3 pr-3 h-fit">
      <div className="flex justify-between w-full sm:h-[1.375rem] h-[1.125rem]">
        <div className="w-3/4 h-4 bg-gray-200 rounded sm:h-4" />
        <div className="w-[1rem] h-[1rem] xs:w-[1.25rem] xs:h-[1.25rem] bg-gray-200 rounded-xl" />
      </div>
      <div className="flex w-full mb-2 h-[1.125rem] xs:h-[1.6875rem]">
        <div className="w-1/4 h-4 bg-gray-200 rounded" />
      </div>
    </div>
  </div>
);

const CardWrapper: React.FC<Pick<CardProps, "public_url" | "children">> = ({
  children,
  public_url,
}) => (
  <Link href={public_url} passHref legacyBehavior>
    <a
      href={public_url}
      className="flex flex-center xs:flex-start w-full h-full max-h-[22.25rem] min-h-[14.5rem]"
    >
      {children}
    </a>
  </Link>
);

const CustomCard = ({ title, date, public_url, tech }: CardProps) => {
  return (
    <CardWrapper public_url={public_url}>
      <div
        className={cn(
          "relative flex flex-col items-center group overflow-hidden",
          "h-full w-full",
          "bg-white border border-gray-200 rounded-xl cursor-pointer",
          "shadow-none hover:shadow-[0_4px_6px_0_rgba(0,0,0,0.2)] transition-all"
        )}
      >
        <div
          className={cn(
            "absolute top-[calc(50%-28px)] left-[50%]",
            "flex flex-row justify-center flex-wrap gap-1 w-full px-2 md:px-4",
            "invisible z-[2] rounded-lg translate-x-[-50%]",
            "opacity-0 transition-[top,opacity] ease-in-out duration-300",
            "group-hover:visible group-hover:top-[calc(50%-56px)] group-hover:opacity-100"
            // "visible top-[calc(50%-56px)] opacity-100"
          )}
        >
          {tech?.map((item) => (
            <span
              className={cn(
                `notion-property-select-item notion-item-${item.color} opacity-100 drop-shadow-md font-semibold`,
                "text-[12px] py-2 xs:text-[14px] xs:py-3"
              )}
              key={item.id}
            >
              {item.name}
            </span>
          ))}
        </div>

        <figure
          className={cn(
            "relative flex flex-col items-center w-full h-full overflow-hidden rounded-lg",
            "min-w-[10.125rem] min-h-[9.75rem] xs:min-h-[12.75rem]",
            'after:block after:content-[""] after:pb-[100%]'
          )}
        >
          <Image
            src="https://images.unsplash.com/photo-1617050318658-a9a3175e34cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
            alt="card-default"
            fill
            className="object-cover transition-all rounded-lg group-hover:scale-105 group-hover:duration-300"
            placeholder="blur"
            blurDataURL={defaultImage}
          />
        </figure>
        <div className={cn("flex flex-col w-full h-fit px-3 pt-2 gap-2")}>
          <div
            className={cn(
              "flex items-center justify-between w-full gap-2 h-[1.375rem]"
            )}
          >
            <span
              className={cn(
                "h-full overflow-hidden text-ellipsis whitespace-nowrap text-base md:text-lg"
              )}
            >
              {title}
            </span>
          </div>
          <div
            className={cn("flex w-full mb-2 h-[1.75rem] text-xs md:text-sm")}
          >
            <span>{format(date, "yyyy-MM-dd")}</span>
          </div>
        </div>
      </div>
    </CardWrapper>
  );
};

const Card = memo(CustomCard) as CardComponentType;
Card.Skeleton = Skeleton;

export default Card;
