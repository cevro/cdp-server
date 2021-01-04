import ModelSignal from '../models/modelSignal';
import AbstractService from 'app/schema/services/abstractService';
import { createActionWithModel, SIGNAL_ACTIONS_PREFIX } from 'app/actions/models';
import { Action, CombinedState, Dispatch } from 'redux';
import { AppStore } from 'app/reducers';
import { addToSent, receiveHandled } from 'app/actions/serial';
import { MapObjects } from 'app/consts/messages';
import { SerialMessage } from 'app/serialConnector';

export default class SignalService extends AbstractService<ModelSignal, {
    serialMessages: MapObjects<SerialMessage>;
}, {
    serialSend(signal: ModelSignal, aspect: number): void;
    receiveHandled(messageId: string): void;
}> {

    public handleRequestChange(model: ModelSignal, aspect: number): void {
        if (model.getRequestedAspect() !== aspect) {
            model.setRequestedAspect(aspect);
            this.reduxProps.dispatch.serialSend(model, aspect);
            this.reduxProps.dispatch.update(model);
        }
    }

    protected reduxPropsDidUpdated(oldProps) {
        super.reduxPropsDidUpdated(oldProps);
        if (oldProps && oldProps.state && this.reduxProps.state.serialMessages !== oldProps.state.serialMessages) {
            this.tryHandleMessages(this.reduxProps.state.serialMessages);
        }
    }

    private tryHandleMessages(messages: MapObjects<SerialMessage>) {
        for (const messageId in messages) {
            if (messages.hasOwnProperty(messageId)) {
                const message = messages[messageId];
                try {
                    const model = this.findByUId(message.uId);
                    this.handleAspectChanged(model, message.value);
                    this.reduxProps.dispatch.receiveHandled(messageId);
                } catch (e) {
                }
            }
        }
    }

    private handleAspectChanged(model: ModelSignal, aspect: number): void {
        if (model.getDisplayedAspect() === aspect) {
            return;
        }

        if (model.getRequestedAspect() !== null && model.getRequestedAspect() !== aspect) {
            this.reduxProps.dispatch.serialSend(model, aspect);
        }
        model.setRequestedAspect(null);
        model.setDisplayedAspect(aspect);
        this.reduxProps.dispatch.update(model);
    }

    protected mapDispatch(dispatch: Dispatch<Action<string>>) {

        return {
            init: (modelSignal: ModelSignal) => dispatch(createActionWithModel(SIGNAL_ACTIONS_PREFIX, 'ACTION_INIT')(modelSignal)),
            update: (modelSignal: ModelSignal) => dispatch(createActionWithModel(SIGNAL_ACTIONS_PREFIX, 'ACTION_UPDATE')(modelSignal)),
            serialSend: (signal: ModelSignal, aspect: number) => dispatch(addToSent({
                uId: signal.getUId(),
                type: 'a',
                value: aspect,
            })),
            receiveHandled: (messageId: string) => dispatch(receiveHandled(messageId)),
        };
    }

    protected mapState(state: CombinedState<AppStore>) {
        return {
            models: state.signals,
            serialMessages: state.serialConnector.received,
        };
    }

    protected getModelClass() {
        return ModelSignal;
    }

    protected getTableName(): string {
        return 'signal';
    }
}
