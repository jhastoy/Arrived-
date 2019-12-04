CREATE TABLE accounts (
    id_account INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    phonenumber_account VARCHAR(12) NOT NULL,
    password_account VARCHAR(16) NOT NULL,
    email_account VARCHAR(32) NOT NULL,
    name_account VARCHAR(32) NOT NULL,
    surname_account VARCHAR(32) NOT NULL
);

CREATE TABLE accounts_accounts
(
    id_account_follower INT NOT NULL,
    id_account_followed INT  NOT NULL,
    FOREIGN KEY (id_account_follower) REFERENCES accounts(id_account) ON UPDATE CASCADE,
    FOREIGN KEY (id_account_followed) REFERENCES accounts(id_account) ON UPDATE CASCADE,
    PRIMARY KEY(id_account_follower,id_account_followed)


);



CREATE TABLE externals
(
    id_external INT PRIMARY KEY NOT NULL,
    phonenumber_external VARCHAR(12) NOT NULL,
    name_external VARCHAR(32) NOT NULL,
    surname_external  VARCHAR(32) NOT NULL,
    idaccount_externals INT NOT NULL,
    FOREIGN KEY (idaccount_externals) REFERENCES accounts(id_account) ON UPDATE CASCADE
);

CREATE TABLE bracelets
(
    id_bracelet INT PRIMARY KEY NOT NULL,
    materialid_bracelet INT NOT NULL,
    name_bracelet VARCHAR(32) NOT NULL,
    surname_bracelet VARCHAR(32) NOT NULL
);

CREATE TABLE accounts_bracelets
(
    id_account_bracelet INT NOT NULL,
    id_bracelet_account INT NOT NULL,
    FOREIGN KEY (id_account_bracelet) REFERENCES accounts(id_account) ON UPDATE CASCADE,
    FOREIGN KEY (id_bracelet_account) REFERENCES bracelets(id_bracelet) ON UPDATE CASCADE,
    PRIMARY KEY(id_account_bracelet,id_bracelet_account)
);

CREATE TABLE places
(
    id_place INT PRIMARY KEY NOT NULL,
    name_place VARCHAR(32),
    latitude_place INT NOT NULL,
    longitude_place INT NOT NULL,
    idbracelet_place INT NOT NULL,
    idaccount_place INT NOT NULL,
    FOREIGN KEY (idbracelet_place) REFERENCES bracelets(id_bracelet) ON UPDATE CASCADE,
    FOREIGN KEY (idaccount_place) REFERENCES accounts(id_account) ON UPDATE CASCADE

);
CREATE TABLE travels
(
    id_travel INT PRIMARY KEY NOT NULL,
    name_travel INT NOT NULL,
    time_travel INT NOT NULL,
    idstart_travel INT NOT NULL,
    idend_travel INT NOT NULL,
    idaccount_travel INT NOT NULL,
    idbracelet_travel INT NOT NULL,
    FOREIGN KEY (idstart_travel) REFERENCES places(id_place) ON UPDATE CASCADE,
    FOREIGN KEY (idend_travel) REFERENCES places(id_place) ON UPDATE CASCADE,
    FOREIGN KEY (idaccount_travel) REFERENCES accounts(id_account) ON UPDATE CASCADE,
    FOREIGN KEY (idbracelet_travel) REFERENCES bracelets(id_bracelet) ON UPDATE CASCADE
);

