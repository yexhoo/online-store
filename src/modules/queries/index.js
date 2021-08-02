module.exports.report = (init, end) => ''
    + 'select p."name", sum(p.quantity) as quantity, ( sum(p.quantity) * p.price) as price '
    + 'From store."Product" p '
    + `where  to_char(p."createdAt", 'YYYY-MM-DD')  between '${init}' and '${end}' `
    + 'group by p."name", p.price '
    + 'order by quantity desc';
