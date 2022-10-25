import { Service } from "./service.model";

export interface ServicesRequest {
    success: boolean,
    services: Service[]
}
