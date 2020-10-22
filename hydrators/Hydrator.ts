// HydratorConfig Description
// 0. PlaidDefault -> Returns pure Plaid Response Types
// 1. TemplateDefault -> Returns pure template Response Types
// 2. Custom -> Returns custom Response Types
import HydratorConfig from '../interfaces/HydratorConfig';
import HydratorMap from '../interfaces/Hydrator';
import plaid from 'plaid';
import path from 'path';

export default class Hydrator {
    hydratorEnv: number = Number(process.env.HYDRATOR_CONFIG) || 0;
    
    constructor() {}

    hydrate<T>(data: T, hydratorType: number) {
        if (! (this.hydratorEnv in HydratorConfig)) throw new Error('Invalid Hydrator Environment Variable');
        
        if (this.hydratorEnv === HydratorConfig.PlaidDefault) return data;
        
        const hydratorSrc = this.getHydratorSrc(hydratorType);
        const hydrator = require(hydratorSrc);
        return hydrator(data);
    }
    
    getHydratorSrc(hydratorType: number): string {
    
        let hydratorSrc: string = path.join(__dirname);
        hydratorSrc += this.hydratorEnv === HydratorConfig.TemplateDefault ? '/template' : '/custom';

        switch (hydratorType) {
            case HydratorMap.Accounts:
                return hydratorSrc + '/Accounts.js';
            default:
                throw new Error('Invalid Hydrator Type');
        }
    }
}

module.exports = Hydrator;