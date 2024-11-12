import { IoChevronDownSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import SessionCard from "../components/sessions/SessionCard.tsx";
import { useNavigate } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import { IoIosSearch } from "react-icons/io";
import SearchBar from "../components/utils/SearchBar.tsx";

interface Session {
  id: number;
  title: string;
  category: string;
  sessionStatus: "open" | "close";
  host: {
    nickname: string;
  };
  participant: number;
  maxParticipant: number;
}
enum SessionStatus {
  OPEN = "open",
  CLOSE = "close",
}

const SessionListPage = () => {
  const [sessionList, setSessionList] = useState<Session[]>([]);
  const [listLoading, setListLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const sessionData: Session[] = [
      {
        id: 1,
        title: "프론트엔드 초보만 들어올 수 있음",
        category: "프론트엔드",
        sessionStatus: "open",
        host: {
          nickname: "J133 네모정",
        },
        participant: 1,
        maxParticipant: 4,
      },
      {
        id: 2,
        title: "백엔드 초보만 들어올 수 있음",
        category: "백엔드",
        sessionStatus: "close",
        host: {
          nickname: "J000",
        },
        participant: 1,
        maxParticipant: 2,
      },
    ];

    setTimeout(() => {
      setSessionList(sessionData);
      setListLoading(false);
    }, 100);
  }, []);

  const renderSessionList = (sessionStatus: SessionStatus) => {
    return sessionList.map((session) => {
      return (
        session.sessionStatus === sessionStatus && (
          <SessionCard
            key={session.id}
            sessionStatus={session.sessionStatus}
            category={session.category}
            title={session.title}
            host={session.host.nickname}
            questionListId={1}
            participant={session.participant}
            maxParticipant={session.maxParticipant}
            onEnter={() => navigate(`/session/${session.id}`)}
          />
        )
      );
    });
  };

  return (
    <section className={"flex flex-col gap-8 max-w-7xl w-screen h-screen p-20"}>
      <div>
        <h1 className={"text-bold-l mb-6"}>스터디 세션 목록</h1>
        <div className={"h-11 flex gap-2 w-[47.5rem]"}>
          <SearchBar text="세션을 검색하세요" />
          <div className="relative inline-block items-center">
            <select
              className={
                "rounded-custom-m bg-green-200 text-semibold-s text-gray-white appearance-none pl-5 pr-11 h-full"
              }
            >
              <option>FE</option>
              <option>BE</option>
            </select>
            <span className="absolute top-1/2 -translate-y-1/2 right-3 pointer-events-none">
              <IoChevronDownSharp className="w-[1.25rem] h-[1.25rem] text-gray-white" />
            </span>
          </div>
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
      <div>
        <h2 className={"text-semibold-l mb-6"}>공개된 세션 목록</h2>
        <ul>
          {listLoading ? (
            <>loading</>
          ) : (
            <>
              {sessionList.length <= 0 ? (
                <li>아직 아무도 세션을 열지 않았어요..!</li>
              ) : (
                renderSessionList(SessionStatus.OPEN)
              )}
            </>
          )}
        </ul>
      </div>
      <div>
        <h2 className={"text-semibold-l mb-6"}>진행 중인 세션 목록</h2>
        <ul>
          {listLoading ? (
            <>loading</>
          ) : (
            <>
              {sessionList.length <= 0 ? (
                <li>아직 아무도 세션을 열지 않았어요..!</li>
              ) : (
                renderSessionList(SessionStatus.CLOSE)
              )}
            </>
          )}
        </ul>
      </div>
    </section>
  );
};

export default SessionListPage;
