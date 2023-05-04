/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/prefer-default-export */
import shortId from 'shortid';
import { faker } from '@faker-js/faker';

// prettier-ignore
export const generateDummyEducation = (num,userId)=>Array(num).fill().map(()=>({
  userId,
  id:shortId.generate(),
  school: faker.helpers.arrayElement(['인하대학교','이화여자대학교','중앙대학교','서울대학교','한양대학교']),
  major :  faker.helpers.arrayElement(['기계공학과','생명공학과','우주공학과','건축공학과', '수학교육과','소프트웨어학과','경영학과']),
  status: faker.helpers.arrayElement(['재학중','학사졸업','석사졸업','박사졸업'])
}));

// prettier-ignore
export const generateDummyAward = (num,userId)=>Array(num).fill().map(()=>({
  userId,
  id:shortId.generate(),
  association: faker.helpers.arrayElement(['엘리스','공작기계협회']),
  contest :  faker.helpers.arrayElement(['제1회 공모전','제7회 프로젝트 대회']),
  startDate : faker.date.birthdate(),
  prize : faker.word(),
  detail: faker.word(),
}));

// prettier-ignore
export const generateDummyCertificate = (num,userId)=>Array(num).fill().map(()=>({
  userId,
  id:shortId.generate(),
  agency: faker.helpers.arrayElement(['한국산업인력공단','한국관광공사','서울지방경찰청']),
  credit: faker.helpers.arrayElement(['정보처리자격증','운전면허증']),
  grade: faker.helpers.arrayElement(['기능사', '기술사','기사','산업기사','1종보통','2종보통']),
  acquireDate: faker.date.birthdate(),
}));

// prettier-ignore
export const generateDummyProject = (num,userId)=>Array(num).fill().map(()=>({
  userId,
  id:shortId.generate(),
  projectName: faker.helpers.arrayElement(['아두이노자동차만들기','자기소개포트폴리오']),
  proejctLink: faker.helpers.arrayElement(['naver.com','google.com']),
  introduction: faker.word(),
  startDate: faker.date.birthdate(),
  myRole : faker.word(),
  detail: faker.word(),
}));
