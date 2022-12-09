import * as React from "react";

export type Category = "Face" | "Body" | "Cloths"

export type DrawerAction = {
    icon: React.ReactNode;
    label: React.ReactNode;
    onClick: (e: React.MouseEvent<HTMLDivElement>) => void;

};

