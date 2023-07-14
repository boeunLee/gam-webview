import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import useGetMagazineDetail from '../lib/hooks/useGetMagazineDetail';
import { magazineDetailState } from '../recoil/atom';
import ErrorPage from '../pages/ErrorPage';
import MagazineImage from './MagazineImage';
import MagazineQuestion from './MagazineQuestion';

const Magazine = () => {
  const { magazineId } = useParams();
  const { magazineResult, isLoading, isError } = useGetMagazineDetail(magazineId);

  const setMagazineDetail = useSetRecoilState(magazineDetailState);
  const magazineDetail = useRecoilValue(magazineDetailState);

  useEffect(() => {
    if (magazineResult) {
      setMagazineDetail(magazineResult.data);
    }
  }, [magazineResult]);

  if (isLoading) return <div>Loading</div>;
  if (isError) return <ErrorPage />;

  return (
    <St.MagazineWrapper>
      <MagazineImage magazinePhotos={magazineDetail.magazinePhotos}></MagazineImage>
      <St.MagazineQAWrapper>
        <St.MagazineIntro>{magazineDetail.magazineIntro}</St.MagazineIntro>
        <MagazineQuestion magazineQuestions={magazineDetail.questions}></MagazineQuestion>
      </St.MagazineQAWrapper>
    </St.MagazineWrapper>
  );
};

export default Magazine;

const St = {
  MagazineWrapper: styled.section`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    width: 100%;
  `,

  MagazineQAWrapper: styled.section`
    padding: 0rem 2rem;
  `,

  MagazineIntro: styled.div`
    margin: 5rem 0rem 5.5rem 0rem;
    font-size: 1.5rem;
    white-space: pre-wrap;
    color: ${({ theme }) => theme.colors.Gam_Black};
    ${({ theme }) => theme.fonts.Gam_Contend_Pretendard_Regular};
  `,
};
