export interface HeaderText {
    courseName: string
}

export interface ContentProps {
    courseParts: CoursePart[]
}

interface CoursePartBase {
    name: string;
    exerciseCount: number;
}

interface CoursePartDescription extends CoursePartBase {
    description: string;
}

export interface CoursePartBasic extends CoursePartDescription {
    kind: "basic"
}

export interface CoursePartGroup extends CoursePartBase {
    groupProjectCount: number;
    kind: "group";
}

export interface CoursePartBackground extends CoursePartDescription {
    backgroundMaterial: string;
    kind: "background";
}

export interface CoursePartRequirements extends CoursePartDescription {
    requirements: string[];
    kind: "special";
}

export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartRequirements;

export interface PartProps {
    part: CoursePart;
}




