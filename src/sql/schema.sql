CREATE TABLE IF NOT EXISTS `signal`
(
    `signal_id`       INT            NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `signal_uid`      VARCHAR(64)    NOT NULL,
    `name`            VARCHAR(8)     NOT NULL,
    `loconet_id`      INT            NULL DEFAULT NULL,
    `type`            ENUM ('entry','exit','path','auto_block','shunt'),
    `construction`    ENUM ('T','K') NULL DEFAULT NULL,
    `last_auto_block` BOOLEAN             DEFAULT FALSE,
    `lights`          VARCHAR(32)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `turnout`
(
    `turnout_id`    INT            NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `turnout_uid`   VARCHAR(64)    NOT NULL,
    `name`          VARCHAR(8)     NOT NULL,
    `base_position` ENUM ('S','D') NOT NULL # straight/diverging
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `sector`
(
    `sector_id`  INT         NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `sector_uid` VARCHAR(64) NOT NULL,
    `name`       VARCHAR(32) NULL DEFAULT NULL
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `route`
(
    `route_id`       INT        NOT NULL PRIMARY KEY,
    `name`           VARCHAR(8) NOT NULL,
    `from_signal_id` INT        NOT NULL,
    `to_signal_id`   INT        NOT NULL,
    `speed`          ENUM (40)  NULL,
    CONSTRAINT `fk_signal_from`
        FOREIGN KEY (`from_signal_id`)
            REFERENCES `signal` (`signal_id`)
            ON DELETE NO ACTION
            ON UPDATE NO ACTION,
    CONSTRAINT `fk_signal_to`
        FOREIGN KEY (`to_signal_id`)
            REFERENCES `signal` (`signal_id`)
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
