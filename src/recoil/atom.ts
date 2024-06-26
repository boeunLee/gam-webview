import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { magazineDetail, magazineDetailResult, magazineListData, magazineToken } from '../types/magazine';

const { persistAtom } = recoilPersist();

export const magazineDetailState = atom<magazineDetail>({
  key: 'magazineDetail',
  default: {
    magazineIntro: '',
    magazinePhotos: ['', '', '', ''],
    questions: [
      {
        questionId: 1,
        questionOrder: 1,
        question: '',
        answer: '',
        answerImage: '',
        imageCaption: '',
        isImageOpen: false,
      },
      {
        questionId: 2,
        questionOrder: 2,
        question: '',
        answer: '',
        answerImage: '',
        imageCaption: '',
        isImageOpen: false,
      },
      {
        questionId: 3,
        questionOrder: 3,
        question: '',
        answer: '',
        answerImage: '',
        imageCaption: '',
        isImageOpen: false,
      },
      {
        questionId: 4,
        questionOrder: 4,
        question: '',
        answer: '',
        answerImage: '',
        imageCaption: '',
        isImageOpen: false,
      },
    ],
  },
  effects_UNSTABLE: [persistAtom],
});

export const magazineListState = atom<magazineListData[]>({
  key: 'magazineList',
  default: [
    {
      magazineId: 1,
      magazineTitle: '',
      interviewee: '',
    },
  ],
  effects_UNSTABLE: [persistAtom],
});

export const magazineResultState = atom<magazineDetailResult>({
  key: 'magazineDetailResult',
  default: {
    title: '',
    interviewPerson: '',
    magazineIntro: '',
    magazinePhotos: ['', '', '', ''],
    questions: [
      {
        questionOrder: 1,
        question: '',
        answer: '',
        answerImage: '',
        imageCaption: '',
      },
      {
        questionOrder: 2,
        question: '',
        answer: '',
        answerImage: '',
        imageCaption: '',
      },
      {
        questionOrder: 3,
        question: '',
        answer: '',
        answerImage: '',
        imageCaption: '',
      },
      {
        questionOrder: 4,
        question: '',
        answer: '',
        answerImage: '',
        imageCaption: '',
      },
    ],
  },
  effects_UNSTABLE: [persistAtom],
});

export const magazineTokenState = atom<magazineToken>({
  key: 'magazineToken',
  default: {
    accessToken: '',
    refreshToken: '',
  },
  effects_UNSTABLE: [persistAtom],
});
