package com.newVitagems.enums;

public enum Authority {
    user("사원"),
    admin("관리자"),
    master("마스터");

    private final String displayName;

    Authority(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}
