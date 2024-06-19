import React from "react";
import { PartProps } from "../types";

const Part: React.FC<PartProps> = ({ part }) => {
    switch (part.kind) {
      case 'basic':
        return (
          <div>
           <h2><b>{part.name}</b></h2>
           <p>
            Description: {part.description}
           </p>
           <p>
            Exercise count: {part.exerciseCount}
           </p>
          </div>
        )
      case 'group':
        return (
          <div>
            <h2><b>{part.name}</b></h2>
            <p>
              Exercise count: {part.exerciseCount}
            </p>
            <p>
              Group project count: {part.groupProjectCount}
            </p>
          </div>
        )      
      case 'background':
        return (
          <div>
            <h2><b>{part.name}</b></h2>
            <p>
              Description: {part.description}
            </p>
            <p>
              Exercise count: {part.exerciseCount}
            </p>
            <p>
              Background material: {part.backgroundMaterial}
            </p>
          </div>
        )
        case 'special':
          return (
            <div>
            <h2><b>{part.name}</b></h2>
            <p>
              Description: {part.description}
            </p>
            <p>
              Exercise count: {part.exerciseCount}
            </p>
            <p>
              Requirements: {part.requirements.map(r => ` ${r}`)}
            </p>
            </div>
          )
      default:
        return assertNever(part)
    }
  }

const assertNever = (value: never): never => {
    throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
    )
}

export default Part;
