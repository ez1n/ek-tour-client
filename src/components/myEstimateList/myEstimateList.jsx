import React, { useEffect } from 'react';
import styles from './myEstimateList.module.css';
import Footer from '../footer/footer';
import Header from '../header/header';
import Menu from '../menu/menu';
import MyEstimateListItem from '../myEstimateListItem/myEstimateListItem';
import PageButton from '../pageButton/pageButton';
import SubHeader from '../subHeader/subHeader';

const MyEstimateList = ({ menu, changeMenu, exit, getEstimateListPage, allPage, requestDataList }) => {
  useEffect(() => {
    changeMenu('나의견적확인');
    getEstimateListPage();
    console.log(menu);
  }, []);

  const allPageArray = (number) => {
    const array = [];
    for (let i=0; i<number; i++) {
      array.push(i+1)
    }
    return array
  };

  return (
    <main className={styles.estimateList}>
      <Header />
      <section className={styles.main}>
        <section className={styles.sideMenu}>
          <Menu />
        </section>
        <section className={styles.mainDetail}>
          <SubHeader menu={menu} />
          <section>
            <div className={styles.dataList}>
              <span className={styles.number}>순번</span>
              <span className={styles.name}>등록자</span>
              <span className={styles.travel}>여행구분</span>
              <span className={styles.departPlace}>출발지</span>
              <span className={styles.arrivalPlace}>도착지</span>
              <span className={styles.vehicle}>차량구분</span>
              <span className={styles.requestDate}>요청일</span>
            </div>
            <ul>
            {requestDataList.map(data => (<MyEstimateListItem data={data} />))}
            </ul>
            <ul className={styles.pageList}>
              {allPageArray(allPage).map(number => (<PageButton page={number} />))}
            </ul>
            <button onClick={exit}>나가기</button>
          </section>
        </section>
      </section>
      <Footer />
    </main>
  )
};

export default MyEstimateList;