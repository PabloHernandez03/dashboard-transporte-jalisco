CREATE TABLE public.etup (
    id integer NOT NULL,
    source_id character varying NOT NULL,
    anio integer NOT NULL,
    mes integer NOT NULL,
    transporte text NOT NULL,
    variable text NOT NULL,
    municipio text NOT NULL,
    valor integer,
    estatus text NOT NULL
);
CREATE SEQUENCE public.etup_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.etup_id_seq OWNED BY public.etup.id;
ALTER TABLE ONLY public.etup ALTER COLUMN id SET DEFAULT nextval('public.etup_id_seq'::regclass);
ALTER TABLE ONLY public.etup
    ADD CONSTRAINT "PK_1678780f0c5bba4cbe45c5cf1f9" PRIMARY KEY (id);
ALTER TABLE ONLY public.etup
    ADD CONSTRAINT "UQ_145886d3553c4f111907a762503" UNIQUE (source_id);
CREATE INDEX "IDX_23a4db7dab72afdd320c7e215d" ON public.etup USING btree (variable);
CREATE INDEX "IDX_877e06a0d12d52b40314751808" ON public.etup USING btree (transporte);
CREATE INDEX "IDX_94c7a69a377e5bbc656a989a77" ON public.etup USING btree (mes);
CREATE INDEX "IDX_e3b2af4811200c4a02f45e42e7" ON public.etup USING btree (anio, mes);
