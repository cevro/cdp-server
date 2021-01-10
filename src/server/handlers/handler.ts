import { BadRequestError, NotFoundError } from 'restify-errors';
import ServiceSignal from 'app/schema/services/serviceSignal';
import { Next, Request, Response } from 'restify';
import ServiceSector from 'app/schema/services/serviceSector';
import ServiceTurnout from 'app/schema/services/serviceTurnout';
import ServiceRoute from 'app/schema/services/serviceRoute';

export default class Handler {

    private readonly serviceSector: ServiceSector;
    private readonly serviceTurnout: ServiceTurnout;
    private readonly serviceRoute: ServiceRoute;
    private readonly serviceSignal: ServiceSignal;

    constructor(
        serviceSignal: ServiceSignal,
        serviceSector: ServiceSector,
        serviceTurnout: ServiceTurnout,
        serviceRoute: ServiceRoute,
    ) {
        this.serviceSector = serviceSector;
        this.serviceTurnout = serviceTurnout;
        this.serviceRoute = serviceRoute;
        this.serviceSignal = serviceSignal;
    }

    public requestChangeSignal(req: Request, res: Response, next: Next) {

        const body = JSON.parse(req.body);
        if (!body.hasOwnProperty('aspect')) {
            return next(new BadRequestError('Param aspect is not included'));
        }
        this.serviceSignal.findByUId(req.params.signalId).requestedAspect = body.aspect;
        res.send(JSON.stringify({message: 'Done'}));
        next(false);
    }

    public requestChangeSector(req: Request, res: Response, next: Next) {
        const sector = this.serviceSector.findByUId(req.params.sectorId);
        if (!sector) {
            return next(new NotFoundError('Sector ' + req.params.sectorId + ' no found'));
        }
        const body = JSON.parse(req.body);
        if (body.hasOwnProperty('locked')) {
            sector.locked = body.locked;
            res.send(JSON.stringify({message: 'Done'}));
            return next(false);
        }
        if (body.hasOwnProperty('occupied')) {
            sector.occupied = body.occupied;
            res.send(JSON.stringify({message: 'Done'}));
            return next(false);
        }
        return next(new BadRequestError('Param occupied or locked is not included'));
    }

    public async requestChangeTurnout(req: Request, res: Response, next: Next) {
        try {
            const body = JSON.parse(req.body);
            if (!body.hasOwnProperty('position')) {
                return next(new BadRequestError('Param position is not included'));
            }
            this.serviceTurnout.findByUId(req.params.turnoutId).requestedPosition = body.position;
        } catch (e) {
            return next(e);
        }

        res.send(JSON.stringify({message: 'Done'}));
        next(false);
    }

    public async requestRouteBuild(req: Request, res: Response, next: Next) {
        const route = this.serviceRoute.findByUId(req.params.routeId);
        if (!route) {
            return next(new NotFoundError('Route ' + req.params.route + ' no found'));
        }
        const body = JSON.parse(req.body);
        if (!body.hasOwnProperty('buildOptions')) {
            return next(new BadRequestError('Param buildOptions is not included'));
        }
        //  this.reduxProps.dispatch.onAddRoute(route.getUId(), body.buildOptions);
        res.send(JSON.stringify({message: 'Done'}));
        next(false);
    }
}
