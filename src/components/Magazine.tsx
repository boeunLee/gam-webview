import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import useGetMagazineDetail from '../lib/hooks/useGetMagazineDetail';
import { magazineDetailState } from '../recoil/atom';
import ErrorPage from '../pages/ErrorPage';
import MagazineImage from './MagazineImage';
import MagazineQuestion from './MagazineQuestion';
import useGetMagazineWebView from '../lib/hooks/useGetMagazineWebView';
import { magazineDetail } from '../types/magazine';

const Magazine = (props: any) => {
  const { magazineId } = useParams();

  const { useRecoilData } = props;

  const [isMobile, setIsMobile] = useState(() => {
    const userAgent = navigator.userAgent;
    const isAppAccess = userAgent.match(/like Mac OS X/i);
    return !!isAppAccess;
  });

  useEffect(() => {
    const userAgent = navigator.userAgent;
    const isAppAccess = userAgent.match(/like Mac OS X/i);
    setIsMobile(!!isAppAccess);
  }, []);

  const { magazineData, isLoading, isError } = isMobile ? useGetMagazineWebView(magazineId as string) : useGetMagazineDetail(magazineId as string);

  const setMagazineDetail = useSetRecoilState(magazineDetailState);
  const magazineDetail = useRecoilValue(magazineDetailState);

  const [magazine, setMagazine] = useState(magazineDetail);

  useEffect(() => {
    if (magazineData && !useRecoilData) {
      setMagazine({
        magazineIntro: magazineData.magazineIntro,
        magazinePhotos: magazineData.magazinePhotos,
        questions: magazineData.questions,
      });
    } else if (useRecoilData) {
      // 매거진 미리보기
      setMagazine(magazineDetail);
    }
  }, [magazineData, useRecoilData]);

  if (isLoading) return <div>Loading</div>;
  if (isError) return <ErrorPage />;

  return (
    <St.MagazineWrapper>
      <MagazineImage magazinePhotos={magazine.magazinePhotos}></MagazineImage>
      <St.MagazineQAWrapper>
        <St.MagazineIntro>{magazine.magazineIntro}</St.MagazineIntro>
        <MagazineQuestion magazineQuestions={magazine.questions}></MagazineQuestion>
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
    max-width: 43rem;
    justify-content: center;
    background-color: ${({ theme }) => theme.colors.Gam_LigthGray};
    margin: auto;
    margin-bottom: 16rem;
    @media only screen and (max-width: 430px) {
      margin-bottom: 0;
    }
  `,

  MagazineQAWrapper: styled.section`
    /* padding: 0rem 2rem; */
  `,

  MagazineIntro: styled.div`
    padding: 0 2rem;
    margin: 6rem 0rem 5.5rem 0rem;
    white-space: pre-wrap;
    color: ${({ theme }) => theme.colors.Gam_Black};
    ${({ theme }) => theme.fonts.Gam_Contend_Pretendard_Regular_16};
  `,
};
