export enum EventActionType {
  AGRESSIVO = 'agressivo',
  VOMITOU = 'vomitou',
  NAO_QUIS_COMER = 'nao-quis-comer',
  MIANDO_MUITO = 'miando-muito',
  AGITADO = 'agitado',
  BOLA_DE_PELOS = 'bola-de-pelos',
  MIJOU_FORA = 'mijou-fora',
  COCO_FORA = 'coco-fora',
  COCO_SANGUE = 'coco-sangue',
  AMOADO = 'amoado',
}

export enum EventActionLabel {
  AGRESSIVO = 'Agressivo',
  VOMITOU = 'Vomito',
  NAO_QUIS_COMER = 'Não quis comer',
  MIANDO_MUITO = 'Miando Muito',
  AGITADO = 'Agitado',
  BOLA_DE_PELOS = 'Bola de pelos',
  MIJOU_FORA = 'Xixi Fora',
  COCO_FORA = 'Cocô Fora',
  COCO_SANGUE = 'Cocô com Sangue',
  AMOADO = 'Amoado',
}

export interface EventAction {
  label: string
  value: EventActionType
  entity: string
}

export const EventActions: EventAction[] = [
  {
    label: EventActionLabel.AGRESSIVO,
    value: EventActionType.AGRESSIVO,
    entity: 'all',
  },
  {
    label: EventActionLabel.VOMITOU,
    value: EventActionType.VOMITOU,
    entity: 'all',
  },
  {
    label: EventActionLabel.NAO_QUIS_COMER,
    value: EventActionType.NAO_QUIS_COMER,
    entity: 'all',
  },
  {
    label: EventActionLabel.MIANDO_MUITO,
    value: EventActionType.MIANDO_MUITO,
    entity: 'all',
  },
  {
    label: EventActionLabel.AGITADO,
    value: EventActionType.AGITADO,
    entity: 'all',
  },
  {
    label: EventActionLabel.BOLA_DE_PELOS,
    value: EventActionType.BOLA_DE_PELOS,
    entity: 'all',
  },
  {
    label: EventActionLabel.MIJOU_FORA,
    value: EventActionType.MIJOU_FORA,
    entity: 'all',
  },
  {
    label: EventActionLabel.COCO_FORA,
    value: EventActionType.COCO_FORA,
    entity: 'all',
  },
  {
    label: EventActionLabel.COCO_SANGUE,
    value: EventActionType.COCO_SANGUE,
    entity: 'all',
  },
  {
    label: EventActionLabel.AMOADO,
    value: EventActionType.AMOADO,
    entity: 'all',
  },
]
