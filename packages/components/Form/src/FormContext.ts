import { createContext } from "react";
import { FormController } from "./FormController";

export const FormContext = createContext(new FormController());
