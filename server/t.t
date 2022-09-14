public Company CheckCompanyCnpj(string companyName, string tradingName, string cnpj)
{
    var filter = Builders<Company>.Filter;
    var query = filter.Or(filter.Regex(x => x.Name, new BsonRegularExpression("/^" + companyName + "$/i")), filter.Regex(x => x.Name, new BsonRegularExpression("/^" + tradingName + "$/i")));
    var companyFound = Collection.Find(query).FirstOrDefault();

    if (companyFound == null || companyFound.Cnpj != null) return companyFound;

    query = filter.Eq("_id", new ObjectId(companyFound.Id));
    var update = Builders<Company>.Update.Set("Cnpj", cnpj);
    Collection.FindOneAndUpdate(query, update);

    return companyFound;
}