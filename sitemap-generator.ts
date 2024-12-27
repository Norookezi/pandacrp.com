import fs from 'fs';
import { routes } from "./src/app/app.routes";
import xmlFormat, { XMLFormatterOptions } from 'xml-formatter';
import { Route, Routes } from './src/route';

require('dotenv').config({ override: true });

interface SitemapRoute {
    loc: string,
    changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never',
    priority: number,
    lastmod: string
};

class Sitemap {
    routes: SitemapRoute[] = [];
    
    addRoute(route: Route): void {
        if (!route.index) return

        this.routes.push({
            loc: `${process.env['HOSTNAME']}/${route.path}`,
            changefreq: route.changefreq??"always",
            priority: route.priority??0.5,
            lastmod: new Date(route.lastmod??Date.now()).toISOString().split('T')[0]
        })
    }

    addRoutes(routes: Routes): void {
        routes.forEach(route => this.addRoute(route));
    }

    makeUrls() {
        return this.routes.map(route => `<url><loc>${route.loc}</loc><lastmod>${route.lastmod}</lastmod><changefreq>${route.changefreq}</changefreq><priority>${route.changefreq}</priority></url>`)
        
    }

    
    toXML(options: {format?: boolean, formatOption?: XMLFormatterOptions}): string {
        const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${this.makeUrls()}</urlset>`

        return !options.format?xml:xmlFormat(xml, options.formatOption)
    }
}

const sitemap = new Sitemap();

sitemap.addRoutes(routes)

fs.writeFileSync("./dist/pandacrp.com/browser/sitemap.xml", sitemap.toXML({format: true, formatOption: {collapseContent: true}}), 'utf-8')
fs.writeFileSync("./dist/pandacrp.com/browser/robots.txt", ['User-agent: *','Allow: /','',`Sitemap: ${process.env['HOSTNAME']}/sitemap.xml`].join('\n'), 'utf-8')