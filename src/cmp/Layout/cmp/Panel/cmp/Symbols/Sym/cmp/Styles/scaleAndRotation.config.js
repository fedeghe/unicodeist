import {
    MIN_SCALE, MAX_SCALE, STEP_SCALE,
    MIN_ROT, MAX_ROT, STEP_ROT,
} from './../../../../../../../../../constants';

export const config = [{
    label: 'Scale',
    field: 'scale',
    min: MIN_SCALE,
    max: MAX_SCALE,
    step: STEP_SCALE,
    rounder: parseFloat,
    quickTune: true,
    fallback: 1
},{
    label: 'Scale x',
    field: 'scaleX',
    min: MIN_SCALE,
    max: MAX_SCALE,
    step: STEP_SCALE,
    rounder: parseFloat,
    quickTune: true,
    fallback: 1
},{
    label: 'Scale y',
    field: 'scaleY',
    min: MIN_SCALE,
    max: MAX_SCALE,
    step: STEP_SCALE,
    rounder: parseFloat,
    quickTune: true,
    fallback: 1
},{
    label: 'Rot. x',
    field: 'rotationX',
    min: MIN_ROT,
    max: MAX_ROT,
    step: STEP_ROT,
    rounder: parseInt,
    unit: '°',
    quickTune: true,
    fallback: 0
},{
    label: 'Rot. y',
    field: 'rotationY',
    min: MIN_ROT,
    max: MAX_ROT,
    step: STEP_ROT,
    rounder: parseInt,
    unit: '°',
    quickTune: true,
    fallback: 0
},{
    label: 'Rot. z',
    field: 'rotationZ',
    min: MIN_ROT,
    max: MAX_ROT,
    step: STEP_ROT,
    rounder: parseInt,
    unit: '°',
    quickTune: true,
    fallback: 0
}];

export default config;