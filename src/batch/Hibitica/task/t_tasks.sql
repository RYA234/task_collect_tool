-- haibiticaのタスク情報を保存するためのテーブル
drop table if exists t_tasks;
CREATE TABLE t_tasks (
    id VARCHAR(255) PRIMARY KEY,
    acquisition_date TIMESTAMP not null,
    completed BOOLEAN ,
    collapse_checklist BOOLEAN ,
    checklist JSONB ,
    type VARCHAR(50) ,
    text TEXT NOT NULL,
    notes TEXT,
    tags JSONB ,
    value NUMERIC ,
    priority NUMERIC ,
    attribute VARCHAR(50),
    challenge JSONB,
    "group" JSONB,
    reminders JSONB,
    by_habitica BOOLEAN NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    primary key(id,acquisition_date)
);