import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import SearchBar from "@/components/common/SearchBar.tsx";
import Sidebar from "@components/common/Sidebar.tsx";
import Select from "@components/common/Select.tsx";
import SessionList from "@components/sessions/list/SessionList.tsx";
import axios from "axios";

interface Session {
  id: number;
  title: string;
  category?: string;
  inProgress: boolean;
  host: {
    nickname?: string;
    socketId: string;
  };
  participant: number; // 현재 참여자
  maxParticipant: number;
  createdAt: number;
}

const SessionListPage = () => {
  const [sessionList, setSessionList] = useState<Session[]>([]);
  const [inProgressList, setInProgressList] = useState<Session[]>([]);
  const [listLoading, setListLoading] = useState(true);
  const [inProgressListLoading, setInProgressListLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getSessionList();
  }, []);

  const getSessionList = async () => {
    try {
      const response = await axios.get("/api/rooms");
      if (Array.isArray(response.data)) {
        const sessions = response.data ?? [];
        setSessionList(sessions.filter((session) => !session.inProgress));
        setInProgressList(sessions.filter((session) => session.inProgress));
        setListLoading(false);
        setInProgressListLoading(false);
      } else {
        throw new Error("세션리스트 불러오기 실패");
      }
    } catch (e) {
      console.error("세션리스트 불러오기 실패", e);
      const sessionData: Session[] = [
        {
          id: 1,
          title: "프론트엔드 초보만 들어올 수 있음",
          category: "프론트엔드",
          inProgress: false,
          host: {
            nickname: "J133 네모정",
            socketId: "2222",
          },
          participant: 1,
          maxParticipant: 4,
          createdAt: 1231231230,
        },
        {
          id: 2,
          title: "백엔드 고수만 들어올 수 있음",
          category: "백엔드",
          inProgress: true,
          host: {
            nickname: "J187 카드뮴",
            socketId: "2221232",
          },
          participant: 1,
          maxParticipant: 2,
          createdAt: 1231231230,
        },
      ];
      setSessionList(sessionData);
      setListLoading(false);
      setInProgressListLoading(false);
    }
  };

  return (
    <section className={"flex w-screen h-screen"}>
      <Sidebar />
      <div className={"flex flex-col gap-8 max-w-7xl px-12 pt-20"}>
        <div>
          <h1 className={"text-bold-l mb-6"}>스터디 세션 목록</h1>
          <div className={"h-11 flex gap-2 w-[47.5rem]"}>
            <SearchBar text="세션을 검색하세요" />
            <Select
              options={[
                { label: "FE", value: "FE" },
                { label: "BE", value: "BE" },
                { label: "CS", value: "CS" },
              ]}
            />
            <button
              className={
                "flex justify-center items-center fill-current min-w-11 min-h-11 bg-green-200 rounded-custom-m box-border"
              }
              onClick={() => navigate("/sessions/create")}
            >
              <IoMdAdd className="w-[1.35rem] h-[1.35rem] text-gray-white" />
            </button>
          </div>
        </div>
        <SessionList
          listTitle={"열려있는 공개 세션 목록"}
          listLoading={listLoading}
          sessionList={sessionList}
        />
        <SessionList
          listTitle={"진행 중인 세션 목록"}
          listLoading={inProgressListLoading}
          sessionList={inProgressList}
        />
      </div>
    </section>
  );
};

export default SessionListPage;
