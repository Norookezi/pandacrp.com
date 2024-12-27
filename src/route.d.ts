import { Route as NGRoute } from "@angular/router";

export interface Route extends NGRoute {
    priority?: number;
    changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
    lastmod?: Date
    index?: boolean = false;
}

export type Routes = Route[];