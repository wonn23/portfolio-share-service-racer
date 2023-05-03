import { Award } from "../db";

class awardService {
    static async addAward({ newAward }) {
        return Award.addAward({ newAward });
    }

    static async getAward({ awardId }) {
        const award = await Award.findById({ awardId });
        if (!award) {
            const errorMessage =
                "해당 수상 정보가 없습니다. 다시 한 번 확인해 주세요.";
            return { errorMessage };
        }

        return award;
    }

    static async getAwardList({ userid }) {
        const awards = await Award.findByUserId({ userid });
        return awards;
    }

    static async setAward({ awardid, toUpdate }) {
        let award = await Award.findById({ awardid });

        if (!award) {
            const errorMessage =
                "해당 수상 정보가 없습니다. 다시 한 번 확인해 주세요.";
            return { errorMessage };
        }

        if (toUpdate.date) {
            const fieldToUpdate = "awarddate";
            const newValue = toUpdate.date;
            award = await Award.update({ awardid, fieldToUpdate, newValue });
        }

        if (toUpdate.title) {
            const fieldToUpdate = "title";
            const newValue = toUpdate.title;
            award = await Award.update({ awardid, fieldToUpdate, newValue });
        }
        if (toUpdate.institution) {
            const fieldToUpdate = "institution";
            const newValue = toUpdate.institution;
            award = await Award.update({ awardid, fieldToUpdate, newValue });
        }

        if (toUpdate.description) {
            const fieldToUpdate = "description";
            const newValue = toUpdate.description;
            award = await Award.update({ awardid, fieldToUpdate, newValue });
        }

        return award;
    }

    static async deleteAward({ awardid }) {
        const isDataDeleted = await Award.deleteById({ awardid });
        if (!isDataDeleted) {
            const errorMessage =
                "해당 수상 정보가 없습니다. 다시 한 번 확인해 주세요.";
            return { errorMessage };
        }
        return { status: "ok" };
    }
}

export { awardService };
