import { UserModel } from "../schemas/user";

class User {
  static async create({ newUser }) {
    const createdNewUser = await UserModel.create(newUser);
    return createdNewUser;
  }

  static async findByEmail({ email }) {
    const user = await UserModel.findOne({ email });
    return user;
  }

  static async findById({ user_id }) {
    const user = await UserModel.findOne({ id: user_id });
    return user;
  }

  static async findAll() {
    const users = await UserModel.find({});
    return users;
  }

  //파일별 구성요소들에 대한 문서 작성 툴을 만들어라
  //
  // 설명
  // 함수 이름
  // 파라미터에 대한 설명
  // 반환 값
  //
  // 파일별 -> 클래스 , 함수 , 상수 , import (의존성)
  //
  //파일 확장자가 소스 파일이거나 헤더파일일 경우
  // 주석을 파싱해서 db에 저장하고
  // 웹으로 뿌려준다.


  //리플렉션이 의미가 있을수 있지만
  //잘 훈련된 학생들이 작성한 주석을 파싱해서
  //문서를 DB로 저장하고
  // 그걸 활용해서 Copilot 과 비슷한 서비스를 만들거나
  // chatgpt 등의 챗봇과 비슷한 서비스를 만들어 볼 수 있다.
  // 새롭고 엄청나게 뛰어난 무언가를 만들기 위해서는 모방이 "필수 불가결한 것일까?"
  // DB 관리또한 매우 중요하다.
  // 대부분 (뇌과학 전문가는 아니지만) 해마에 한계가 올 수 있다..

  // 커밋 메시지에 제한이 없으니 해당 파일의 변동 내역 등 여러 내용을 자세히
  // 기록한다.



  /**
   * @description
   *      유저의 아이디와 업데이트 될 필드의 이름 업데이트될 값을 받아
   *      DB에 저장하고 업데이트한 값을 반환합니다.
   * @param user_id
   *          유저의 아이디
   * @param fieldToUpdate
   *          업데이트 될 필드 이름
   * @param newValue
   *          업데이트 될 값
   * @returns {Promise<*>}
   *            update된 user 객체를
   *            Promise 객체에 Wrapping 하여 반환합니다.
   */
  static async update({ user_id, fieldToUpdate, newValue }) {
    const filter = { id: user_id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedUser = await UserModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedUser;
  }
}

export { User };

