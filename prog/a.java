import java.util.Scanner;
import java.util.Arrays;

class Main{
	public static void main(String []args){
		Scanner obj = new Scanner(System.in);

                int n = obj.nextInt();

                int []arr = new int[n];
               
                for(int i=0; i<n; i++) arr[i] = obj.nextInt();
                       Arrays.sort(arr);

                for(int i=0; i<n; i++) System.out.println(arr[i]);
	}
}