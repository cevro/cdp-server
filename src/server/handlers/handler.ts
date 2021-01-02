import { BadRequestError, NotFoundError } from 'restify-errors';
import SignalService from 'app/schema/services/signalService';
import { Next, Request, Response } from 'restify';
import SectorService from 'app/schema/services/sectorService';
import TurnoutService from 'app/schema/services/turnoutService';
import RouteService from 'app/schema/services/routeService';
import RouteBuilder from 'app/routes/routeBuilder';

export default class Handler {

    private readonly signalService: SignalService;
    private readonly sectorService: SectorService;
    private readonly turnoutService: TurnoutService;
    private readonly routeBuilder: RouteBuilder;
    private readonly routeService: RouteService;

    constructor(
        signalService: SignalService,
        sectorService: SectorService,
        turnoutService: TurnoutService,
        routeBuilder: RouteBuilder,
        routeService: RouteService,
    ) {
        this.signalService = signalService;
        this.sectorService = sectorService;
        this.turnoutService = turnoutService;
        this.routeBuilder = routeBuilder;
        this.routeService = routeService;
    }

    public requestChangeSignal(req: Request, res: Response, next: Next) {
        const signal = this.signalService.findByUId(req.params.signalId);
        if (!signal) {
            return next(new NotFoundError('Signal ' + req.params.signalId + ' no found'));
        }
        const body = JSON.parse(req.body);
        if (!body.hasOwnProperty('aspect')) {
            return next(new BadRequestError('Param aspect is not included'));
        }
        signal.requestChange(body.aspect);
        res.send(JSON.stringify({message: 'Done'}));
        next(false);
    }

    public requestChangeSector(req: Request, res: Response, next: Next) {
        const sector = this.sectorService.findByUId(req.params.sectorId);
        if (!sector) {
            return next(new NotFoundError('Sector ' + req.params.sectorId + ' no found'));
        }
        const body = JSON.parse(req.body);
        if (!body.hasOwnProperty('state')) {
            return next(new BadRequestError('Param state is not included'));
        }
        sector.setState(body.state);
        res.send(JSON.stringify({message: 'Done'}));
        next(false);
    }

    public async requestChangeTurnout(req: Request, res: Response, next: Next) {
        const turnout = this.turnoutService.findByUId(req.params.turnoutId);
        if (!turnout) {
            return next(new NotFoundError('Turnout ' + req.params.turnoutId + ' no found'));
        }
        const body = JSON.parse(req.body);
        if (!body.hasOwnProperty('position')) {
            return next(new BadRequestError('Param position is not included'));
        }
        await turnout.requestChange(body.position);
        res.send(JSON.stringify({message: 'Done'}));
        next(false);
    }

    public async requestRouteBuild(req: Request, res: Response, next: Next) {
        const route = this.routeService.findByUId(req.params.routeId);
        if (!route) {
            return next(new NotFoundError('Route ' + req.params.route + ' no found'));
        }
        const body = JSON.parse(req.body);
        if (!body.hasOwnProperty('buildOptions')) {
            return next(new BadRequestError('Param buildOptions is not included'));
        }
        await this.routeBuilder.buildRoute(route, body.buildOptions);
        res.send(JSON.stringify({message: 'Done'}));
        next(false);
    }
}
