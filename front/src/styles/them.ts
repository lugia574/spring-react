export type Colorkey =
  | "primary"
  | "black"
  | "white"
  | "orange"
  | "red"
  | "commentGray"
  | "borderGray"
  | "routeGray"
  | "successGreen";
export type ButtonSize = "large" | "medium" | "small";
export type FontSize = "xlarge" | "large" | "medium" | "small" | "xsmall";
export type MediaQuery = "mobile" | "desktop";
export type ButtonScheme = "primary" | "secondary" | "normal";
export type BorderRadius =
  | "default"
  | "tab"
  | "write"
  | "tabContainer"
  | "leftRadius"
  | "rightRadius"
  | "cicle";
export type BoxShadow = "default" | "itemShadow";

interface Theme {
  borderRadius: {
    [key in BorderRadius]: string;
  };
  color: {
    [key in Colorkey]: string;
  };
  buttonSize: {
    [key in ButtonSize]: {
      fontSize: string;
      padding: string;
    };
  };
  buttonScheme: {
    [key in ButtonScheme]: {
      color: string;
      backgroundColor: string;
      border: string;
    };
  };
  fontSize: {
    [key in FontSize]: string;
  };
  mediaQuery: {
    [key in MediaQuery]: string;
  };
  boxShadow: {
    [key in BoxShadow]: string;
  };
}

export const theme: Theme = {
  borderRadius: {
    default: "8px",
    write: "30px",
    tab: "8px 8px 0 0" /* 위, 오른쪽 위, 오른쪽 아래, 아래 */,
    tabContainer: " 0 0 8px 8px",
    leftRadius: " 8px 0 0 8px",
    rightRadius: "0 8px 8px 0",
    cicle: "50%",
  },

  /* font-color */
  color: {
    primary: "#f7d794", // skyBlue
    black: "#333333",
    white: "#ffffff",
    orange: "#FF6020",
    red: "#F83030",
    commentGray: "#999999", // 댓글 쓴 포스팅 제목, 로그인 회원가입 글자
    borderGray: "#e7e7e7",
    routeGray: "#555555", // 대한민국 > 서울/경기•강원도•경상도
    successGreen: "#2ecc71",
  },

  /* font-size */
  fontSize: {
    xlarge: "1.75rem", // 28 -> 게시글 title
    large: "1.5rem", // 24 -> 모달창 폰트 크기(font )
    medium: "1.125rem", // 18 -> 소제목, 게시글 일정 담아가기 등
    small: "1rem", // 16 -> 기본 폰트
    xsmall: "0.875rem", // 14
  },

  /* button-size */
  buttonSize: {
    large: {
      fontSize: "1.125rem",
      padding: "0.75rem 3rem",
    },
    medium: {
      fontSize: "1rem",
      padding: "0.5rem 1.5rem",
    },
    small: {
      fontSize: "0.875rem",
      padding: "0.25rem 0.75rem",
    },
  },

  /* button-scheme */
  buttonScheme: {
    primary: {
      color: "#333333",
      backgroundColor: "#f7d794",
      border: "1px solid #f7d794",
    },
    secondary: {
      color: "#ffffff",
      backgroundColor: "#f7d794",
      border: "1px solid #e7e7e7",
    },
    normal: {
      color: "#333333",
      backgroundColor: "#ffffff",
      border: "1px solid #e7e7e7",
    },
  },

  boxShadow: {
    default: "0 0 8px rgba(0, 0, 0, 0.3)",
    itemShadow: "0px 4px 10px rgba(0, 0, 0, 0.4)",
  },

  /* mediaQuery */
  mediaQuery: {
    mobile: "(min-width: 0) and (max-width: 768px)",
    desktop: "(min-width: 769px)",
  },
};
