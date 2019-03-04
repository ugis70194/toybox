#include<iostream>
#include<algorithm>
using namespace std;

int main(){
    int N,NG[3];
    cin >> N >> NG[0] >> NG[1] >> NG[2];

    int dp[310];
    const int INF = 1e9;
    fill(dp,dp+310,INF);
    
    dp[N] = 0;
    for(int i=0; i<3; i++) dp[NG[i]] = INF;

    for(int i=N; i>0; i--){
        for(int j=0; j<=3; j++){
            if(i-j < 0 || i-j == NG[0]  || i-j == NG[1] || i-j == NG[2]) continue;
            dp[i-j] = min(dp[i-j],dp[i]+1); 
        }
    }

    if(dp[0] <= 100) cout << "YES" << endl;
    else cout << "NO" << endl; 
}