CREATE TABLE movies(
    movie_id serial,
    title character varying,
    m_year character varying,
    imbdID character varying,
    type character varying,
    poster text,
    created_at timestamp without time zone,
    primary key(movie_id)
);

CREATE TABLE comments(
    comment_id serial,
    comment text,
    movie_id integer,
    title varchar,
    primary key(comment_id),
    foreign key(movie_id) references movies(movie_id)
);