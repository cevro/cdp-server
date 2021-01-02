CREATE TABLE IF NOT EXISTS `signal`
(
    `signal_id`       INT            NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `signal_uid`      VARCHAR(64)    NOT NULL,
    `name`            VARCHAR(8)     NOT NULL,
    `type`            ENUM ('entry','exit','path','auto_block','shunt'),
    `construction`    ENUM ('T','K') NULL DEFAULT NULL,
    `last_auto_block` BOOLEAN             DEFAULT FALSE,
    `lights`          VARCHAR(32),
    INDEX (`signal_uid`),
    UNIQUE (`signal_uid`)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `turnout`
(
    `turnout_id`    INT            NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `turnout_uid`   VARCHAR(64)    NOT NULL,
    `name`          VARCHAR(8)     NOT NULL,
    `base_position` ENUM ('S','D') NOT NULL, # straight/diverging
    INDEX (turnout_uid),
    UNIQUE (`turnout_uid`)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `sector`
(
    `sector_id`  INT         NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `sector_uid` VARCHAR(64) NOT NULL,
    `name`       VARCHAR(32) NULL DEFAULT NULL,
    INDEX (`sector_uid`),
    UNIQUE (`sector_uid`)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `route`
(
    `route_id`            INT         NOT NULL PRIMARY KEY,
    `route_uid`           VARCHAR(64) NOT NULL,
    `name`                VARCHAR(8)  NOT NULL,
    `from_signal_uid`     VARCHAR(64) NOT NULL,
    `to_signal_uid`       VARCHAR(64) NULL     DEFAULT NULL,
    `speed`               ENUM (40)   NULL     DEFAULT 40,
    `sufficient_distance` BOOLEAN     NOT NULL DEFAULT TRUE,
    UNIQUE (`route_uid`),
    FOREIGN KEY (`from_signal_uid`)
        REFERENCES `signal` (`signal_uid`)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION,
    FOREIGN KEY (`to_signal_uid`)
        REFERENCES `signal` (`signal_uid`)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `turnout_position`
(
    `turnout_position_id` INT NOT NULL PRIMARY KEY,
    `route_id`            INT NOT NULL,
    `turnout_id`          INT NOT NULL,
    `position`            ENUM ('S','D'),
    CONSTRAINT `fk_turnout_position_turnout`
        FOREIGN KEY (`turnout_id`)
            REFERENCES `turnout` (`turnout_id`)
            ON DELETE NO ACTION
            ON UPDATE NO ACTION,
    CONSTRAINT `fk_turnout_position_route`
        FOREIGN KEY (`route_id`)
            REFERENCES `route` (`route_id`)
            ON DELETE NO ACTION
            ON UPDATE NO ACTION

) ENGINE = InnoDB;
