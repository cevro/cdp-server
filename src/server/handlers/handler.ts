import { BadRequestError, NotFoundError } from 'restify-errors';
import SignalService from 'app/schema/services/signalService';
import { Next, Request, Response } from 'restify';
import SectorService from 'app/schema/services/sectorService';
import TurnoutService from 'app/schema/services/turnoutService';
import ReduxConnector from 'app/reduxConnector';
import { Action, CombinedState, Dispatch } from 'redux';
import { AppStore } from 'app/reducers';
import { RouteBuilderActions } from 'app/actions/routeBuilder';
import { BackendRouteLock } from 'app/consts/interfaces/routeLock';
import BuildOptions = BackendRouteLock.BuildOptions;
import RouteService from 'app/routes/routeService';

export default class Handler extends ReduxConnector<any, {
    // ;
    onAddRoute(routeUId: string, buildOptions: BuildOptions): void;
}> {

    private readonly sectorService: SectorService;
    private readonly turnoutService: TurnoutService;
    private readonly routeService: RouteService;
    private readonly signalService: SignalService;

    constructor(
        signalService: SignalService,
        sectorService: SectorService,
        turnoutService: TurnoutService,
        routeService: RouteService,
    ) {
        super();
        this.sectorService = sectorService;
        this.turnoutService = turnoutService;
        this.routeService = routeService;
        this.signalService = signalService;
        this.connect();
    }

    public requestChangeSignal(req: Request, res: Response, next: Next) {

        const body = JSON.parse(req.body);
        if (!body.hasOwnProperty('aspect')) {
            return next(new BadRequestError('Param aspect is not included'));
        }
        this.signalService.handleRequestChange(req.params.signalId, body.aspect);
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
        res.send(JSON.stringify({message: 'Done'}));
        next(false);
    }

    public async requestChangeTurnout(req: Request, res: Response, next: Next) {
        try {
            const body = JSON.parse(req.body);
            if (!body.hasOwnProperty('position')) {
                return next(new BadRequestError('Param position is not included'));
            }
            this.turnoutService.handleRequestChange(req.params.turnoutId, body.position);
        } catch (e) {
            return next(e);
        }

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
        this.reduxProps.dispatch.onAddRoute(route.getUId(), body.buildOptions);
        res.send(JSON.stringify({message: 'Done'}));
        next(false);
    }

    protected mapDispatch(dispatch: Dispatch<Action<string>>) {
        return {
            /*   onRequestTurnoutChange: (turnoutUId: string, position: BackendTurnout.EndPosition) =>
                   dispatch(TurnoutActions.requestChangePosition(turnoutUId, position)),*/
            onAddRoute: (routeUId: string, buildOptions: BuildOptions) => dispatch(RouteBuilderActions.addRoute(routeUId, buildOptions)),
        };
    }

    protected mapState(store: CombinedState<AppStore>) {
        return {};
    }
}
