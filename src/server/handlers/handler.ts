import { BadRequestError, NotFoundError } from 'restify-errors';
import SignalService from 'app/schema/services/signalService';
import { Next, Request, Response } from 'restify';
import SectorService from 'app/schema/services/sectorService';
import TurnoutService from 'app/schema/services/turnoutService';
import RouteService from 'app/schema/services/routeService';
import ReduxConnector from 'app/reduxConnector';
import { Action, CombinedState, Dispatch } from 'redux';
import { SignalActions } from 'app/actions/signal';
import { AppStore } from 'app/reducers';
import { TurnoutActions } from 'app/actions/turnout';
import { BackendTurnout } from 'app/consts/interfaces/turnout';
import { RouteBuilderActions } from 'app/actions/routeBuilder';
import addRoute = RouteBuilderActions.addRoute;
import { BackendRouteLock } from 'app/consts/interfaces/routeLock';
import BuildOptions = BackendRouteLock.BuildOptions;

export default class Handler extends ReduxConnector<any, {
    onRequestSignalChange(signalUId: string, aspect: number): void;
    onRequestTurnoutChange(turnoutUId: string, position: BackendTurnout.EndPosition): void;
    onAddRoute(routeUId: string, buildOptions: BuildOptions): void;
}> {

    private readonly sectorService: SectorService;
    private readonly turnoutService: TurnoutService;
    private readonly routeService: RouteService;

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
        this.connect();
    }

    public requestChangeSignal(req: Request, res: Response, next: Next) {
        const body = JSON.parse(req.body);
        if (!body.hasOwnProperty('aspect')) {
            return next(new BadRequestError('Param aspect is not included'));
        }
        this.reduxProps.dispatch.onRequestSignalChange(req.params.signalId, body.aspect);
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
        this.reduxProps.dispatch.onRequestTurnoutChange(req.params.turnoutId, body.position);
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
            onRequestSignalChange: (signalUId: string, aspect: number) =>
                dispatch(SignalActions.requestChangeAspect(signalUId, aspect)),
            onRequestTurnoutChange: (turnoutUId: string, position: BackendTurnout.EndPosition) =>
                dispatch(TurnoutActions.requestChangePosition(turnoutUId, position)),
            onAddRoute: (routeUId: string, buildOptions: BuildOptions) => dispatch(addRoute(routeUId, buildOptions)),
        };
    }

    protected mapState(store: CombinedState<AppStore>) {
        return {};
    }
}
