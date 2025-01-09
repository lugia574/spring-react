package com.back.back.constants;

public class MessageConstants {
    // 사용자
    public static final String OK_JOIN = "회원가입이 완료되었습니다.\n로그인을 진행해주세요.";
    public static final String OK_LOGIN = "로그인이 완료되었습니다.";
    public static final String BAD_REQUEST_LOGIN = "아이디 또는 비밀번호가 일치하지 않습니다.";
    public static final String FAILED_HASH_PASSWORD = "비밀번호 암호화에 실패했습니다.";
    public static final String OK_NICKNAME = "사용 가능한 닉네임입니다.";
    public static final String ALREADY_NICKNAME = "이미 존재하는 닉네임입니다.";
    public static final String OK_EMAIL = "사용 가능한 이메일입니다.";
    public static final String ALREADY_EMAIL = "이미 존재하는 이메일입니다.";
    public static final String EXIST_USER = "사용자가 존재합니다.";
    public static final String NOT_EXIST_USER = "존재하지 않는 사용자 입니다.";
    public static final String UNAUTHORIZED_NOT_LOGIN = "로그인 후 이용이 가능합니다.";
    public static final String DATA_UPDATE_FAILED = "개인 정보를 수정하는데 실패했습니다.";
    public static final String DATA_UPDATE_SUCCESSED = "개인 정보를 수정했습니다.";
    public static final String NOT_FOUND_USER = "존재하지 않은 사용자입니다.";
    public static final String OK_RESET_REQUEST = "비밀번호를 변경할 수 있습니다.";
    public static final String BE_WRITED_EMAIL = "이메일을 작성해야 합니다.";
    public static final String OK_RESET_PASSWORD = "비밀번호 변경이 완료되었습니다.";
    public static final String BAD_REQUEST_RESET_PASSWORD = "비밀번호 변경이 실패했습니다.";
    public static final String BAD_REQUEST_ORIGIN_PASSWORD = "현재 비밀번호가 일치하지 않습니다.";
    public static final String OK_LOGOUT = "로그아웃 되었습니다.";
    public static final String OK_WITHDRAW = "탈퇴 처리되었습니다.";
    public static final String BAD_REQUEST_WITHDRAW = "탈퇴를 실패했습니다.";
    public static final String BAD_REQUEST_USER = "잘못된 요청입니다.";

    // 공용
    public static final String NOT_FOUND_DATA = "존재하지 않는 페이지 입니다.";

    // 카테고리
    public static final String NOT_FOUND_CATEGORY = "카테고리를 불러오지 못했습니다.";

    // 찜하기/좋아요
    public static final String NOT_FOUND_PLACES_LIST = "찜한 장소가 없습니다.";
    public static final String NOT_FOUND_POST_LIST = "좋아요한 포스트가 없습니다.";
    public static final String ALREADY_LIKE_PLACES = "이미 찜한 장소입니다.";
    public static final String BAD_REQUEST_LIKE_PLACE = "잘못된 요청입니다.";
    public static final String OK_LIKE_PLACE = "장소를 찜했습니다.";
    public static final String OK_UNLIKE_PLACE = "찜한 장소에서 삭제되었습니다.";
    public static final String NOT_FOUND_USER_LIKES_POST = "좋아요한 게시글이 존재하지 않습니다.";
    public static final String CONFLICT_LIKE_POST = "이미 좋아요한 게시글 입니다.";
    public static final String OK_LIKE_POST = "포스팅을 좋아요 했습니다.";

    // 게시글
    public static final String NOT_FOUND_POST = "존재하지 않는 게시글 입니다.";
    public static final String NOT_FOUND_POSTS = "게시글이 존재하지 않습니다.";
    public static final String NOT_FOUND_LIKE = "좋아요를 하지 않았습니다.";
    public static final String OK_UNLIKE_POST = "게시글을 좋아요 해지 했습니다.";
    public static final String OK_UPLOAD_POST = "게시글 등록이 완료되었습니다.";
    public static final String BAD_REQUEST_UPLOAD_POST = "게시글 등록을 실패했습니다.";
    public static final String NOT_FOUND_POSTS_LIST = "게시글이 없습니다.";
    public static final String OK_UPDATE_POST = "게시글을 수정하였습니다.";
    public static final String BAD_REQUEST_UPDATE_POST = "게시글 수정을 실패했습니다.";
    public static final String OK_DELETE_POST = "게시글이 삭제되었습니다.";

    // 댓글
    public static final String NOT_FOUND_COMMENTS = "댓글이 존재하지 않습니다.";
    public static final String OK_UPLOAD_COMMENT = "댓글 등록이 완료되었습니다.";
    public static final String OK_SELECT_COMMENT = "댓글 조회가 완료되었습니다.";
    public static final String OK_UPDATE_COMMENT = "댓글 수정이 완료되었습니다.";
    public static final String OK_DELETE_COMMENT = "댓글 삭제가 완료되었습니다.";
    public static final String BAD_REQUEST_COMMENT = "잘못된 요청입니다.";



    // 500 에러 메시지
    public static final String INTERNAL_SERVER_ERROR = "서버 내부 오류입니다.";
}
