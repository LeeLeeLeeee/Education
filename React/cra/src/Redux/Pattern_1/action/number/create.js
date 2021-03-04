/* Action 생성 */
import { INCREASE, DECREASE, UPDATE} from './type';

export const increase = () => ({
    type: INCREASE
});

export const decrease = () => ({
    type: DECREASE
});

export const update = num => ({
    type: UPDATE,
    payload: { num }
});
