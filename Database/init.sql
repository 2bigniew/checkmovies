CREATE TABLE movies(
    movie_id serial,
    title character varying,
    imbd_id character varying,
    created_at timestamp without time zone,
    primary key(movie_id)
);

CREATE TABLE comments(
    comment_id serial,
    comment text,
    movie_id integer,
    created_at timestamp without time zone,
    primary key(comment_id),
    foreign key(movie_id) references movies(movie_id)
);