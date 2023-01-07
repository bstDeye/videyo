namespace Videyo.Api.Db.Configs;

public class DbConfig
{
    public const string Section = "Database";
    public string Username { get; set; }
    public long Port { get; set; }
    public string Database { get; set; }
    public string Password { get; set; }
    public string Host { get; set; }
}