DROP SCHEMA IF EXISTS webproject CASCADE;
CREATE SCHEMA webproject;

CREATE TABLE webproject.compagnies
(
    id_company  SERIAL PRIMARY KEY,
    company_name        varchar(30)  NOT NULL,
    description varchar(250) NOT NULL,
    adress      varchar(100) NOT NULL,
    mail        varchar(100) NOT NULL UNIQUE,
    password    varchar(50)  NOT NULL
);

CREATE TABLE webproject.type_offers
(
    id_type_offer SERIAL PRIMARY KEY,
    type_offer         varchar(50) NOT NULL
);
CREATE TABLE webproject.job_offers
(
    id_offer    SERIAL PRIMARY KEY,
    company     INTEGER REFERENCES webproject.compagnies (id_company)     NOT NULL,
    title       varchar(50)                                               NOT NULL,
    type_offer  INTEGER REFERENCES webproject.type_offers (id_type_offer) NOT NULL,
    description varchar(250)                                              NOT NULL,
    upload_date DATE                                                      NOT NULL DEFAULT current_date
);
CREATE TABLE webproject.developers
(
    id_developer        SERIAL PRIMARY KEY,
    lastname            varchar(50)  NOT NULL,
    firstname           varchar(50)  NOT NULL,
    mail                varchar(100) NOT NULL UNIQUE,
    password            varchar(50)  NOT NULL,
    birth_date          DATE CHECK ( birth_date <> current_date),
    tel                 varchar(12)  NOT NULL,
    type_offer_required INTEGER REFERENCES webproject.type_offers (id_type_offer)
);

CREATE TABLE webproject.languages
(
    id_language SERIAL PRIMARY KEY,
    language       varchar(15) UNIQUE
);

CREATE TABLE webproject.mastered_languages
(
    developper INTEGER REFERENCES webproject.developers (id_developer) NOT NULL,
    language   INTEGER REFERENCES webproject.languages (id_language)   NOT NULL,
    CONSTRAINT mastered_languages_pkey PRIMARY KEY (developper, language)
);

CREATE TABLE webproject.required_languages
(
    job_offer INTEGER REFERENCES webproject.job_offers (id_offer)   NOT NULL,
    language  INTEGER REFERENCES webproject.languages (id_language) NOT NULL,
    CONSTRAINT required_languages_pkey PRIMARY KEY (job_offer, language)
);

CREATE TABLE webproject.matches
(

    job_offer               INTEGER REFERENCES webproject.job_offers (id_offer)     NOT NULL,
    developer               INTEGER REFERENCES webproject.developers (id_developer) NOT NULL,
    developer_is_interested BOOLEAN                                                 NOT NULL DEFAULT TRUE,
    company_is_interested   BOOLEAN                                                 NOT NULL DEFAULT FALSE,
    CONSTRAINT matches_pkey PRIMARY KEY (job_offer, developer)


);
